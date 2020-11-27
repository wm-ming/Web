var colors = ["#f26395", "#62efab", "#ef7658", "#ffe868", "#80e3f7", "#d781f9"];
export function getRandom (min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
export default function () {
	var index = getRandom(0, colors.length);
	return colors[index];
}