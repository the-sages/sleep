const SLEEP_CYCLE = 90 * 60 * 1000; // 90 minutes
const TIME_TO_SLEEP = 15 * 60 * 1000; // 15 minutes
const BULLETS_AMOUNT = 6;

const calculateWakeUpTime = (timeFrom) => {
	const timeToSleep = new Date().setTime(
		timeFrom + TIME_TO_SLEEP + SLEEP_CYCLE
	);
	return timeToSleep;
};

const createBullet = (time) => {
	const bullet = document.createElement('div');
	bullet.classList.add('bullet');
	bullet.innerHTML = new Intl.DateTimeFormat('en', {
		hour: 'numeric',
		minute: 'numeric',
	}).format(new Date(time));
	return bullet;
};

const applyWakeUpTime = () => {
	const currentDate = new Date();
	const currentTime = currentDate.getTime();
	const bullets = [];
	let cycleTime = currentTime;
	for (let i = 0; i < BULLETS_AMOUNT; i++) {
		cycleTime = calculateWakeUpTime(cycleTime);
		bullets.push(createBullet(cycleTime));
	}
	document.querySelector('.bullets-container').innerHTML = '';
	document.querySelector('.bullets-container').append(...bullets);
};

document.body.onload = () => {
	applyWakeUpTime();
	const calculateWakeUpTimeButton = document.querySelector(
		'.calculate-wake-up-time'
	);

	calculateWakeUpTimeButton.addEventListener('click', () => {
		applyWakeUpTime();
	});
};
