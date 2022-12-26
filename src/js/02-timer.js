import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnTimerStart: document.querySelector('[data-start]'),
  timerFieldDays: document.querySelector('[data-days]'),
  timerFielHours: document.querySelector('[data-hours]'),
  timerFieldMinutes: document.querySelector('[data-minutes]'),
  timerFieldSeconds: document.querySelector('[data-seconds]'),
};

refs.btnTimerStart.disabled = true;
let timerId = null;
const INTERVAL_DELAY = 1000;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      refs.btnTimerStart.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future', {
        timeout: 5000,
        width: '300px',
      });
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onTimerStart() {
  const selectedDate = fp.selectedDates[0];

  timerId = setInterval(() => {
    const startTime = new Date();

    const countdown = selectedDate - startTime;
    refs.btnTimerStart.disabled = true;

    if (countdown < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimeFace(convertMs(countdown));
  }, INTERVAL_DELAY);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateTimeFace({ days, hours, minutes, seconds }) {
  refs.timerFieldDays.textContent = addLeadingZero(days);
  refs.timerFielHours.textContent = addLeadingZero(hours);
  refs.timerFieldMinutes.textContent = addLeadingZero(minutes);
  refs.timerFieldSeconds.textContent = addLeadingZero(seconds);
}

const fp = flatpickr('#datetime-picker', options);
console.log('fp', fp);
refs.btnTimerStart.addEventListener('click', onTimerStart);
