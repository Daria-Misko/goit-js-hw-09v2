import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		const date2 = new Date(selectedDates[0]).getTime();
		const date1 = new Date().getTime();
		if (date2 <= date1) {
			Notiflix.Notify.failure('Please choose a date in the future');
			buttonStart.disabled = true;
		} else {
			buttonStart.disabled = false;
		}
	},
};

flatpickr("#datetime-picker", options);

const day = document.querySelector('.value[data-days]')
const hour = document.querySelector('.value[data-hours]')
const minute = document.querySelector('.value[data-minutes]')
const second = document.querySelector('.value[data-seconds]')

const buttonStart = document.querySelector('button[data-start]')
const input = document.getElementById('datetime-picker')

buttonStart.addEventListener('click', findDate)

function findDate() {
	const date2 = new Date(input.value).getTime();
	const date1 = new Date().getTime();
	let dateNum = date2 - date1;
	
	let timerId = setInterval(() => {
		if (dateNum < 1000) {
			clearInterval(timerId);
			buttonStart.disabled = false;
		} else {
			buttonStart.disabled = true;

			dateNum = dateNum - 1000;
			let date = convertMs(dateNum);
			// перетворюємо в масив дати 
			second.textContent = addLeadingZero(date.seconds);
			minute.textContent = addLeadingZero(date.minutes);
			hour.textContent = addLeadingZero(date.hours);
			day.textContent = addLeadingZero(date.days);
		}
	}, 1000);
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

function addLeadingZero(value) {
	return String(value).padStart(2, '0');
}