const refs = {
  body: document.body,
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

const INTERVAL_DELAY = 1000;
let interval = null;

refs.btnStart.addEventListener('click', changeColor);
refs.btnStop.addEventListener('click', onBtnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  interval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_DELAY);

  refs.btnStart.disabled = true;
}

function onBtnStop() {
  clearInterval(interval);
  refs.btnStart.disabled = false;
}
