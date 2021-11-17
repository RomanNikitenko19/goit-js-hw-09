const bodyRef = document.querySelector('body');
const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');


function getRandomHexColor() {
 return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const randomBackgroundColor = () => {
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStartRef.setAttribute('disabled', true);
  // btnStartRef.disabled = true;
};

btnStopRef.addEventListener('click', () => {
  clearInterval(timerId);
  btnStartRef.removeAttribute('disabled');
  // btnStartRef.disabled = false;
});

btnStartRef.addEventListener('click', randomBackgroundColor);

