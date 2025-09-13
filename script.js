const SLEEP_CYCLE = 90 * 60 * 1000; // 90 minutes
const TIME_TO_SLEEP = 15 * 60 * 1000; // 15 minutes
const BULLETS_AMOUNT = 6;

const calculateWakeUpTime = (timeFrom) => {
	const timeToSleep = new Date().setTime(
		timeFrom + SLEEP_CYCLE
	);
	return timeToSleep;
};

const createBullet = (time, highlight = false) => {
	const bullet = document.createElement('div');
	bullet.classList.add('bullet');
	if (highlight) {
		bullet.classList.add('highlight');
	}
	bullet.innerHTML = new Intl.DateTimeFormat('en', {
		hour: 'numeric',
		minute: 'numeric',
	}).format(new Date(time));
	return bullet;
};

const applyWakeUpTime = () => {
	const currentDate = new Date();
	const currentTime = currentDate.getTime() + TIME_TO_SLEEP;
	const bullets = [];
	let cycleTime = currentTime;
	for (let i = 0; i < BULLETS_AMOUNT; i++) {
		cycleTime = calculateWakeUpTime(cycleTime);
		bullets.push(createBullet(cycleTime, BULLETS_AMOUNT - 2 <= i));
	}
	document.querySelector('.bullets-container').innerHTML = '';
	document.querySelector('.bullets-container').append(...bullets);
};


document.body.onload = () => {
	applyWakeUpTime();
	const calculateWakeUpTimeButton = document.querySelector('.calculate-wake-up-time');
	calculateWakeUpTimeButton.addEventListener('click', () => {
		applyWakeUpTime();
	});

	// Custom iOS-like time picker logic
	const hourSelect = document.getElementById('wake-up-hour');
	const minuteSelect = document.getElementById('wake-up-minute');
	const calculateSleepTimeButton = document.querySelector('.calculate-sleep-time');
	const sleepBulletsContainer = document.querySelector('.sleep-bullets-container');

	// Populate hour and minute selects
	for (let h = 0; h < 24; h++) {
		const option = document.createElement('option');
		option.value = h;
		option.textContent = h.toString().padStart(2, '0');
		hourSelect.appendChild(option);
	}
	for (let m = 0; m < 60; m++) {
		const option = document.createElement('option');
		option.value = m;
		option.textContent = m.toString().padStart(2, '0');
		minuteSelect.appendChild(option);
	}

	// Set default to next full hour
	const now = new Date();
	let defaultHour = now.getHours() + 1;
	if (defaultHour >= 24) defaultHour = 0;
	hourSelect.value = defaultHour;
	minuteSelect.value = 0;

	const applySleepTime = () => {
		const hours = parseInt(hourSelect.value, 10);
		const minutes = parseInt(minuteSelect.value, 10);
		if (isNaN(hours) || isNaN(minutes)) {
			sleepBulletsContainer.innerHTML = '<span style="color: #ffb3b3">Please select a wake-up time.</span>';
			return;
		}
		const now = new Date();
		const wakeUpDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
		if (wakeUpDate.getTime() < now.getTime()) {
			wakeUpDate.setDate(wakeUpDate.getDate() + 1);
		}
		let cycleTime = wakeUpDate.getTime();
		const bullets = [];
		for (let i = 0; i < BULLETS_AMOUNT; i++) {
			cycleTime -= SLEEP_CYCLE;
			const sleepTime = cycleTime - TIME_TO_SLEEP;
			bullets.push(createBullet(sleepTime, BULLETS_AMOUNT - 2 <= i));
		}
		sleepBulletsContainer.innerHTML = '';
		sleepBulletsContainer.append(...bullets.reverse());
	};

	calculateSleepTimeButton.addEventListener('click', applySleepTime);
};
