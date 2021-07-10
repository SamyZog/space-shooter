const hud = document.querySelector(".hud");
const hudShooterLives = hud.querySelector(".hud__shooter-lives");
const hudScore = hud.querySelector(".hud__score");

const cooldownMeter = document.querySelector(".cooldown-meter");
const cooldownBar = document.querySelector(".hud__bar");

const space = document.querySelector(".space");
const spaceTop = space.getBoundingClientRect().top;
const spaceBottom = space.getBoundingClientRect().bottom;
const spaceLeft = space.getBoundingClientRect().left;
const spaceRight = space.getBoundingClientRect().right;

const modal = document.querySelector(".modal");
const modalMsg = modal.querySelector(".modal__main-msg");
const modalStatsBox = modal.querySelector(".modal__stats");
const modalActionBox = modal.querySelector(".modal__action-box");
const modalTime = modal.querySelector(".modal__stats-text-time");
const modalScore = modal.querySelector(".modal__stats-text-score");
const restartGameBtn = modal.querySelector(".modal__action-btn");

const settingsModal = document.querySelector(".settings");

const difficultyOptionsButtons = settingsModal.querySelectorAll(".settings__difficulty-options > button");

const fighterOptionsButtons = settingsModal.querySelectorAll(".settings__fighter-options > div");

const canvasOptionsButtons = settingsModal.querySelectorAll(".settings__canvas-options > button");

const startButton = document.querySelector(".start__button");

export {
	hud,
	hudShooterLives,
	hudScore,
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
	modal,
	modalMsg,
	modalStatsBox,
	modalActionBox,
	restartGameBtn,
	modalTime,
	modalScore,
};
