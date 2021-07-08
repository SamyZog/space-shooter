import {
	canvasOptionsButtons,
	difficultyOptionsButtons,
	greetingModal,
	hud,
	shooterOptionsButtons,
	space,
	startButton,
} from "./elements";
import { GAME_SETTING_OPTIONS } from "./settings";
import SpaceShooter from "./SpaceShooter";

let difficultyChosen = false;
let shooterChosen = false;

const START = () => {
	// setup initial game settings template
	const userGameSettings = {
		difficultySettings: {},
		shooterSettings: {},
	};

	// set HUD to be invisible because modal is on screen
	hud.style.display = "none";

	const setGameSettings = (settingsObj, value) => {
		userGameSettings[settingsObj] = GAME_SETTING_OPTIONS[settingsObj][value];
	};

	difficultyOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleDifficultyChoice);
	});

	shooterOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleShooterChoice);
	});

	// highlight default canvas choice
	canvasOptionsButtons[3].style.outline = "2px solid var(--light)";

	canvasOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleCanvasChoice);
	});

	// disable start game button so the user has to choose options before starting game
	startButton.disabled = true;

	startButton.addEventListener("click", handleStartButton);

	const resetOutline = (payload) => {
		const clearOutline = (el) => (el.style.outline = "none");
		switch (payload) {
			case "difficulty":
				difficultyOptionsButtons.forEach((button) => {
					clearOutline(button);
				});
				break;
			case "shooter":
				shooterOptionsButtons.forEach((button) => {
					clearOutline(button);
				});
				break;
			case "canvas":
				canvasOptionsButtons.forEach((button) => {
					clearOutline(button);
				});
				break;
		}
	};

	const setOutline = (el) => {
		el.style.outline = "2px solid var(--light)";
	};

	const setCanvasImage = (id) => {
		// change canvas background image when user switches choices
		import(`../assets/space/${id.toLowerCase()}.png`).then((res) => {
			space.style.backgroundImage = `url(${res.default})`;
		});
	};

	const checkChoices = function () {
		startButton.disabled = !(difficultyChosen && shooterChosen);
		if (!startButton.disabled) {
			startButton.focus();
		}
	};

	function handleDifficultyChoice() {
		difficultyChosen = true;
		resetOutline("difficulty");
		setOutline(this);
		setGameSettings("difficultySettings", this.id);
		checkChoices();
	}

	function handleShooterChoice() {
		shooterChosen = true;
		resetOutline("shooter");
		setOutline(this);
		setGameSettings("shooterSettings", this.id);
		checkChoices();
	}

	function handleCanvasChoice() {
		resetOutline("canvas");
		setOutline(this);
		setCanvasImage(this.id);
	}

	function handleStartButton() {
		hud.style.display = "flex";
		const game = new SpaceShooter(userGameSettings);
		game.init();
		greetingModal.style.display = "none";
	}
};

export default START;
