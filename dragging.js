const slider = document.querySelector(".slider-container");
const sliderButton = document.querySelector(".slider-button");
const number = document.querySelector(".number");

sliderButton.addEventListener("mousedown", function drag(event) {
    
  event.preventDefault(); // prevent selection start (browser action)

  let shiftX = event.clientX - sliderButton.getBoundingClientRect().left;
  // shiftY not needed, the sliderButton moves only horizontally

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);

  function onMouseMove(event) {
    let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

    // the pointer is out of slider => lock the sliderButton within the bounaries
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = slider.offsetWidth - sliderButton.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    sliderButton.style.left = newLeft + "px";

    if (event.clientX - slider.getBoundingClientRect().left < 0) {
      number.innerText = 0;
    } else if (
      event.clientX - slider.getBoundingClientRect().left >
      rightEdge
    ) {
      number.innerText = rightEdge / 4;
    } else {
      number.innerText = Math.floor(
        (event.clientX - slider.getBoundingClientRect().left) / 4);
    }
  }

  function onMouseUp() {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
  }
});

sliderButton.ondragstart = function () {
  return false;
};

const king = document.querySelector(".king-image");
const squareList = document.querySelectorAll(".container");
let kingOverSquare = false;

king.addEventListener("mousedown", function dragPiece(event) {
    event.preventDefault();

    let parentSquare = king.parentNode;

    parentSquare.removeChild(king);
    document.body.appendChild(king);

    let newLeft = event.clientX - king.offsetWidth / 2;
    let newTop = event.clientY - king.offsetHeight / 2;

    // when you click on the piece, no matter where you click it centers
    // the element on the cursor
    king.style.left = newLeft + "px";
    king.style.top = newTop + "px";

    // let shiftX = event.clientX - king.getBoundingClientRect().left;
    // let shiftY = event.clientY - king.getBoundingClientRect().top;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    function onMouseMove(event) {
        newLeft = event.clientX - king.offsetWidth / 2;
        newTop = event.clientY - king.offsetHeight / 2;

        king.style.left = newLeft + "px";
        king.style.top = newTop + "px";
    }

    function onMouseUp() {
        const kingCenterX =
        king.getBoundingClientRect().left + king.offsetWidth / 2;
        const kingCenterY =
        king.getBoundingClientRect().top + king.offsetHeight / 2;

        for (const square of squareList) {
            // if the center of the king element is within the square put king in square
            if (
            kingCenterX > square.getBoundingClientRect().left &&
            kingCenterX < square.getBoundingClientRect().left + square.offsetWidth &&
            kingCenterY > square.getBoundingClientRect().top &&
            kingCenterY < square.getBoundingClientRect().top + square.offsetHeight
            ) {
                const centerX = square.offsetWidth / 2 - king.offsetWidth / 2;
                const centerY = square.offsetHeight / 2 - king.offsetHeight / 2;
        
                king.style.left = centerX + "px";
                king.style.top = centerY + "px";
                square.appendChild(king);
                parentSquare = square;
                kingOverSquare = true;
            }
        }

        if (!kingOverSquare) {
            parentSquare.appendChild(king);
            king.style.left = "15px";
            king.style.top = "15px";
        }

        kingOverSquare = false;

        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
    }
});

king.ondragstart = function () {
  return false;
};
