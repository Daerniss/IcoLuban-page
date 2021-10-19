// HEADER
const classes = {
	pinned   : 'header__pin',
	unpinned : 'header__unpin',
	top      : 'header__top'
};
document.addEventListener('scroll', headerHandler);
let lastKnownScrollY = 0;
let currentY = window.pageYOffset;
const header = document.querySelector('.header');
function headerHandler (e) {
	currentY = window.pageYOffset;

	if (currentY == 0) {
		header.classList.remove(classes.pinned);
		header.classList.remove(classes.unpinned);
	} else if (currentY > lastKnownScrollY) {
		header.classList.remove(classes.pinned);
		header.classList.add(classes.unpinned);
	} else if (currentY < lastKnownScrollY) {
		header.classList.remove(classes.unpinned);
		header.classList.add(classes.pinned);
	}

	lastKnownScrollY = currentY;
}

document.querySelector('#menuToggle').addEventListener('change', function (e) {
	const check = document.querySelector('#menuToggle');
	const html = document.querySelector('html');

	if (check.checked) {
		html.style.overflow = 'hidden';
	} else {
		html.style.overflow = 'visible';
	}
});

// VIDEO MODAL

document.querySelector('#videoBtn').addEventListener('click', function (e) {
	const modal = document.querySelector('#modal');
	const iframe = document.querySelector('.video-modal iframe');

	if (!modal.classList.contains('video-modal--active')) {
		modal.classList.add('video-modal--active');
	}

	modal.addEventListener('click', function () {
		modal.classList.remove('video-modal--active');
		let src = iframe.src;
		iframe.src = '';
		iframe.src = src;
	});
});

// ANIMATION

window.addEventListener('scroll', function () {
	const anime = document.querySelector('.road__animation');
	const plane = document.querySelector('.road__plane');
	const svg = document.querySelector('.road__animation svg');
	const item1 = document.querySelector('.road__item--1');
	const item2 = document.querySelector('.road__item--2');
	const item3 = document.querySelector('.road__item--3');
	console.log(anime.getBoundingClientRect().top);
	if (anime.getBoundingClientRect().top < 0) {
		svg.classList.add('road__svg');
		item1.classList.add('road__item--animate');
		item2.classList.add('road__item--animate');
		item3.classList.add('road__item--animate');
		plane.classList.add('road__plane--active');
	}
});
