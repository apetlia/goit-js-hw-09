const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

refs.buttonStart.addEventListener('click', onButtonStartClick);
refs.buttonStop.addEventListener('click', onButtonStopClick);

buttonToggleDisable(refs.buttonStop);

let timerId = null;

function onButtonStartClick() {
  changeBodyBgColor();
  timerId = setInterval(changeBodyBgColor, 1000);
  buttonToggleDisable(refs.buttonStart);
  buttonToggleDisable(refs.buttonStop);
}

function onButtonStopClick() {
  clearInterval(timerId);
  buttonToggleDisable(refs.buttonStart);
  buttonToggleDisable(refs.buttonStop);
}

function changeBodyBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function buttonToggleDisable(button) {
  button.disabled = button.disabled ? false : true;
}
