const hud = document.querySelector(".hud");

const cooldownMeter = document.querySelector(".cooldown-meter");

const cooldownBar = document.querySelector(".hud__bar");

const space = document.querySelector(".space");

const spaceTop = space.getBoundingClientRect().top;
const spaceBottom = space.getBoundingClientRect().bottom;
const spaceLeft = space.getBoundingClientRect().left;
const spaceRight = space.getBoundingClientRect().right;

const settingsModal = document.querySelector(".settings");

const difficultyOptionsButtons = settingsModal.querySelectorAll(".settings__difficulty-options > button");

const fighterOptionsButtons = settingsModal.querySelectorAll(".settings__fighter-options > div");

const canvasOptionsButtons = settingsModal.querySelectorAll(".settings__canvas-options > button");

const startButton = document.querySelector(".start__button");

export {
	hud,
	space,
	spaceTop,
	spaceBottom,
	spaceLeft,
	spaceRight,
	cooldownMeter,
	cooldownBar,
	settingsModal,
	difficultyOptionsButtons,
	fighterOptionsButtons,
	canvasOptionsButtons,
	startButton,
};
