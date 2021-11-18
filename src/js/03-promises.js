import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  })
}

const handleSubmit = (e) => {
  e.preventDefault();
  const {
    elements: { delay, step, amount }
  } = e.currentTarget;

  // if (!delay.value || !step.value || !amount.value) {
  //   Notiflix.Notify.warning('Please fill in all the fields!');
  // }

  let counter = 0;
  const stepN = Number(step.value);
  const delayN = Number(delay.value);
  const amountN = Number(amount.value);
  let totalDelay = delayN;
  while (counter < amountN) {
    counter += 1;
    createPromise(counter, totalDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    totalDelay += stepN;
  }

}

formRef.addEventListener('submit', handleSubmit);