const orangeTextBox = document.querySelector(".orange-text-box");
const orangeOrb = document.querySelector(".orange-orb");

orangeOrb.addEventListener("mouseover", displayText);
orangeOrb.addEventListener("mouseout", hideText);

function displayText() {
    orangeTextBox.style.opacity = 1;
}

function hideText() {
    orangeTextBox.style.opacity = 0;
}