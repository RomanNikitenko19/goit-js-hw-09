import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};

refs.btn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);//time left

    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.btn.removeAttribute('disabled');
    }

    const handleClick = () => {
      refs.input.setAttribute('disabled', true);

      const timerId = setInterval(() => {
        refs.btn.setAttribute('disabled', true);
        const timeLeft = selectedDates[0] - new Date();
        const { days, hours, minutes, seconds } = convertMs(timeLeft);
        if (timeLeft <= 0) {
          Notiflix.Notify.info('the time has come');
          refs.input.removeAttribute('disabled');
          clearInterval(timerId);
          refs.btn.removeEventListener('click', handleClick);
          // document.location.reload();

        }
        refs.spanDays.textContent = addLeadingZero(days, 3); //days.toString().padStart(3, '0');
        refs.spanHours.textContent = addLeadingZero(hours, 2); //hours.toString().padStart(2, '0');
        refs.spanMinutes.textContent = addLeadingZero(minutes, 2); //minutes.toString().padStart(2, '0');
        refs.spanSeconds.textContent = addLeadingZero(seconds, 2); //seconds.toString().padStart(2, '0');
      }, 1000);
    };
    refs.btn.addEventListener('click', handleClick);
  },
};

flatpickr(refs.input, options);


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

function addLeadingZero(value, number) {
  return value.toString().padStart(number, 0);
}
