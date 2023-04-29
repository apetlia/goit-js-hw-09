import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
  form: document.forms[0],
};

ref.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const data = collectFormData(event.target);
  startLoopPromises(data);
}

function collectFormData(formRef) {
  const data = {};
  const formData = new FormData(formRef);

  formData.forEach((value, key) => {
    data[key] = Number(value);
  });

  return data;
}

function startLoopPromises({ delay, step, amount }) {
  for (let position = 0; position < amount; position += 1) {
    createPromise(position + 1, delay + step * position)
      .then(notifySuccess)
      .catch(notifyFailure);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function notifySuccess({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function notifyFailure({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
