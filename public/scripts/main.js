/**
 * @type {HTMLBodyElement}
 */
const appBody = document.getElementById("app");

/**
 * @type {HTMLElement}
 */
const track = document.querySelector(".image-track");

/**
 * @type {HTMLCollectionOf<HTMLElement>}
 */
const trackImages = track.getElementsByClassName("image-track__image");

/**
 * @param {MouseEvent} event
 */
window.onmousedown = (event) => {
	track.dataset.mouseDownAt = event.clientX;

	appBody.style.cursor = "grabbing";
};

/**
 * @param {MouseEvent} event
 */
window.onmouseup = (event) => {
	track.dataset.mouseDownAt = "0";
	track.dataset.lastPercentage = track.dataset.percentage;

	appBody.style.cursor = "grab";
};

/**
 * @param {MouseEvent} event
 */
window.onmousemove = (event) => {
	if (track.dataset.mouseDownAt === "0") return;

	const mouseDelta = parseFloat(track.dataset.mouseDownAt) - event.clientX;
	const maxDelta = window.innerWidth / 2;

	const percentage = (mouseDelta / maxDelta) * 100;
	let nextPercentage = parseFloat(track.dataset.lastPercentage) + percentage;
	nextPercentage = Math.min(nextPercentage, 100);
	nextPercentage = Math.max(nextPercentage, 0);

	track.dataset.percentage = nextPercentage;

	track.animate(
		{
			transform: `translate(${-nextPercentage}%, -50%)`,
		},
		{ duration: 1200, fill: "forwards" }
	);

	for (const image of trackImages) {
		image.animate(
			{
				objectPosition: `${100 - nextPercentage}% 50%`,
			},
			{ duration: 1200, fill: "forwards" }
		);
	}
};

/**
 * @param {WheelEvent} event
 */
window.onwheel = (event) => {
	const percentage = (event.deltaY / window.innerWidth) * 100;
	let nextPercentage = parseFloat(track.dataset.lastPercentage) + percentage;
	nextPercentage = Math.min(nextPercentage, 100);
	nextPercentage = Math.max(nextPercentage, 0);

	track.dataset.percentage = nextPercentage;
	track.dataset.lastPercentage = nextPercentage;

	track.animate(
		{
			transform: `translate(${-nextPercentage}%, -50%)`,
		},
		{ duration: 1200, fill: "forwards" }
	);

	for (const image of trackImages) {
		image.animate(
			{
				objectPosition: `${100 - nextPercentage}% 50%`,
			},
			{ duration: 1200, fill: "forwards" }
		);
	}
};
