const hud = document.querySelector(".hud");

const cooldownMeter = document.querySelector(".cooldown-meter");

const cooldownBar = document.querySelector(".bar");

const space = document.querySelector(".space");

const spaceTop = space.getBoundingClientRect().top;
const spaceBottom = space.getBoundingClientRect().bottom;
const spaceLeft = space.getBoundingClientRect().left;
const spaceRight = space.getBoundingClientRect().right;

const greetingModal = document.querySelector(".greeting");

const difficultyOptionsButtons = greetingModal.querySelectorAll(".difficulty-options > button");

const shooterOptionsButtons = greetingModal.querySelectorAll(".shooter-options > button");

const canvasOptionsButtons = greetingModal.querySelectorAll(".canvas-options > button");

const startButton = document.querySelector(".start");

export {
	hud,
	cooldownMeter,
	cooldownBar,
	space,
	spaceTop,
	spaceBottom,
	spaceLeft,
	spaceRight,
	greetingModal,
	difficultyOptionsButtons,
	shooterOptionsButtons,
	canvasOptionsButtons,
	startButton,
};
