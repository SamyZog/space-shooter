import {
	canvasOptionsButtons,
	difficultyOptionsButtons,
	fighterOptionsButtons,
	hud,
	restartGameBtn,
	settingsModal,
	space,
	startButton,
} from "./elements";
import { GAME_SETTING_OPTIONS } from "./settings";
import SpaceShooter from "./SpaceShooter";

let difficultyChosen = false;
let shooterChosen = false;
let canvasChosen = false;

let game;

const START = () => {
	// setup initial game settings template
	const userGameSettings = {
		difficultySettings: {},
		shooterSettings: {},
	};

	const setGameSettings = (settingsObj, value) => {
		userGameSettings[settingsObj] = GAME_SETTING_OPTIONS[settingsObj][value];
	};

	difficultyOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleDifficultyChoice);
	});

	fighterOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleFighterChoice);
	});

	canvasOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleCanvasChoice);
	});

	startButton.disabled = true;

	startButton.addEventListener("click", handleStartButton);

	restartGameBtn.addEventListener("click", function () {
		location.reload();
	});

	const resetStyle = (payload) => {
		switch (payload) {
			case "difficulty":
				difficultyOptionsButtons.forEach((button) => {
					button.style.color = `var(--light)`;
				});
				break;
			case "fighter":
				fighterOptionsButtons.forEach((button) => {
					button.style.borderColor = `var(--tint1)`;
				});
				break;
			case "canvas":
				canvasOptionsButtons.forEach((button) => {
					button.style.borderColor = "var(--tint1)";
				});
				break;
		}
	};

	const setStyle = (element, payload) => {
		switch (payload) {
			case "difficulty":
				element.style.color = `var(--tint2)`;
				break;
			case "fighter":
				element.style.borderColor = `var(--${element.dataset.color})`;
				break;
			case "canvas":
				element.style.borderColor = "var(--tint2)";
				break;

			default:
				break;
		}
	};

	const setCanvasImage = (id) => {
		// change canvas background image when user switches choices
		import(`../assets/space/${id.toLowerCase()}.png`).then((res) => {
			space.style.backgroundImage = `url(${res.default})`;
		});
	};

	const checkChoices = function () {
		if (difficultyChosen && shooterChosen && canvasChosen) {
			startButton.disabled = false;
			startButton.focus();
		}
	};

	function handleDifficultyChoice() {
		const payload = "difficulty";
		difficultyChosen = true;
		resetStyle(payload);
		setStyle(this, payload);
		setGameSettings("difficultySettings", this.id);
		checkChoices();
	}

	function handleFighterChoice() {
		const payload = "fighter";
		shooterChosen = true;
		resetStyle(payload);
		setStyle(this, payload);
		setGameSettings("shooterSettings", this.dataset.color.toUpperCase());
		checkChoices();
	}

	function handleCanvasChoice() {
		const payload = "canvas";
		canvasChosen = true;
		setCanvasImage(this.id);
		resetStyle(payload);
		setStyle(this, payload);
		checkChoices();
	}

	function handleStartButton() {
		game = new SpaceShooter(userGameSettings);
		settingsModal.style.display = "none";
		hud.style.height = "5vh";
		space.style.height = "95vh";
		game.init();
	}
};

export { game };
export default START;
