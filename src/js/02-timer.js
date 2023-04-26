import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  inputData: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onCloseCalendar,
};

let selectedDate = null;
ref.buttonStart.disabled = true;

flatpickr(ref.inputData, options);

ref.buttonStart.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
  ref.buttonStart.disabled = true;
  ref.inputData.disabled = true;
  timerStart();
}

function timerStart() {
  const leftTime = selectedDate - Date.now();

  if (leftTime > 0) {
    updateWebUI(convertMs(leftTime));

    return setTimeout(timerStart, 1000);
  }
}

function updateWebUI({ days, hours, minutes, seconds }) {
  ref.days.textContent = addLeadingZero(days);
  ref.hours.textContent = addLeadingZero(hours);
  ref.minutes.textContent = addLeadingZero(minutes);
  ref.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function onCloseCalendar(selectedDt) {
  selectedDate = Date.parse(selectedDt);

  if (selectedDate > Date.now()) {
    ref.buttonStart.disabled = false;
  } else {
    Notify.failure('Please choose a date in the future');
    ref.buttonStart.disabled = true;
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
