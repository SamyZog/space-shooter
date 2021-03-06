// store the elements that we want to dynamically manipulate later

// options and settings for the user
const settingsModal = document.querySelector(".settings");
const difficultyOptionsButtons = settingsModal.querySelectorAll(".settings__difficulty-options > button");
const fighterOptionsButtons = settingsModal.querySelectorAll(".settings__fighter-options > div");
const canvasOptionsButtons = settingsModal.querySelectorAll(".settings__canvas-options > button");

const startButton = document.querySelector(".start__button");
startButton.disabled = true;

// playing canvas elements
const space = document.querySelector(".space");
space.classList.add("space");

// hud elements
const hud = document.querySelector(".hud");
const hudShooterLives = hud.querySelector(".hud__shooter-lives");
const hudScore = hud.querySelector(".hud__score");
const cooldownMeter = document.querySelector(".hud__cooldown-meter");
const cooldownBar = document.querySelector(".hud__bar");

// modal elements to interact with user
const modal = document.querySelector(".modal");
const modalMsg = modal.querySelector(".modal__main-msg");
const modalStatsBox = modal.querySelector(".modal__stats");
const modalActionBox = modal.querySelector(".modal__action-box");
const modalTime = modal.querySelector(".modal__stats-text-time");
const modalScore = modal.querySelector(".modal__stats-text-score");
const restartGameBtn = modal.querySelector(".modal__action-btn");

export {
	hud,
	hudShooterLives,
	hudScore,
	space,
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
