const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

buttonStart.addEventListener('click', colorBgChange)
buttonStop.addEventListener('click', blocColorBgChange)

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStop.disabled = true;

let timerId = null;

function colorBgChange() {
	timerId = setInterval(() => {
		return document.body.style.backgroundColor = getRandomHexColor();
	}, 1000);
	buttonStop.disabled = false;
	buttonStart.disabled = true;
}

function blocColorBgChange() {
	clearInterval(timerId);
	buttonStop.disabled = true;
	buttonStart.disabled = false;
}

