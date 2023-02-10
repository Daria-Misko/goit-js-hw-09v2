import Notiflix from 'notiflix';

const firstDelay = document.querySelector('input[name="delay"]')
const delayStep = document.querySelector('input[name="step"]')
const amountInput = document.querySelector('input[name="amount"]')
const submitBtn = document.querySelector('button[type="submit"]')

submitBtn.addEventListener("click", onSubmit);

function onSubmit(e) {
	e.preventDefault();

	let delay = Number(firstDelay.value)
	const step = Number(delayStep.value)
	const amount = Number(amountInput.value)

	for (i = 1; i <= amount; i += 1){
		let position = i;
		
		createMsg(position, delay)

		delay += step;
	}
}

function createPromise(position, delay) {
	return new Promise((resolve, reject) => {
		const shouldResolve = Math.random() > 0.3;

		setTimeout(() => {
			if (shouldResolve) {
				resolve({ position, delay });
			} reject({ position, delay });
		},
			delay);} 
	)
}

function createMsg(position, delay) {
createPromise(position, delay)
	.then(({ position, delay }) => {
		Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
	})
	.catch(({ position, delay }) => {
		Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
	});
}