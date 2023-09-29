const track = document.querySelector(".image-track");

window.onmousedown = (event) => {
	track.dataset.mouseDownAt = event.clientX;
};

window.onmouseup = (event) => {
	track.dataset.mouseDownAt = "0";
	track.dataset.lastPercentage = track.dataset.percentage;
};

window.onmousemove = (event) => {
	if (track.dataset.mouseDownAt === "0") return;

	const mouseDelta = parseFloat(track.dataset.mouseDownAt) - event.clientX;
	const maxDelta = window.innerWidth / 2;

	const percentage = (mouseDelta / maxDelta) * 100;
	let nextPercentage = parseFloat(track.dataset.lastPercentage) + percentage;
	nextPercentage = Math.min(nextPercentage, 100);
	nextPercentage = Math.max(nextPercentage, 0);

	track.dataset.percentage = nextPercentage;
	track.style.transform = `translate(${-nextPercentage}%, -50%)`;
};
