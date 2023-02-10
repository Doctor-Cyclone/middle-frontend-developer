import data from './data';
import './index.scss';

let currentSoundId = '';
const allSound = document.querySelector('.sounds');
const volumeControl = document.querySelector('.sounds__volume');
document.body.style.backgroundImage = `url('./images/rainy-bg.jpg')`;

const audio = new Audio();
audio.loop = true;

volumeControl.addEventListener('input', (event) => {
	audio.volume = event.target.value / 100;
});

allSound.addEventListener('click', (event) => {
	const soundId = event.target.closest('[data-sound-id]')?.dataset.soundId;
	const soundItem = data.filter((dataItem) => dataItem.id === soundId)[0];

	if (currentSoundId === soundItem.id) {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	} else {
		currentSoundId = soundItem.id;
		audio.src = soundItem.srcSound;
		audio.play();
		document.body.style.backgroundImage = `url('${soundItem.srcBackground}')`;
	}
});

const createItem = soundItem => {
	const listItem = document.createElement('li');
	listItem.classList.add('sounds__item');
	listItem.dataset.soundId = soundItem.id;
	listItem.style.backgroundImage = `url('${soundItem.srcBackground}')`;
	allSound.append(listItem);

	const itemIcon = document.createElement('img');
	itemIcon.classList.add('sounds__icon');
	itemIcon.src = soundItem.srcIcon;
	listItem.append(itemIcon);
}

data.forEach(soundItem => createItem(soundItem));

