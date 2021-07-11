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

// track if user has made all mandatory choices
let isDifficultyChosen = false;
let isShooterChosen = false;
let isCanvasChosen = false;

// game class instance will be stored here, I instantiated it here to access it globally
let game;

const START = () => {
	// initial game settings template
	const userGameSettings = {
		difficultySettings: {},
		shooterSettings: {},
	};

	// add listeners to the difficulty options buttons
	difficultyOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleDifficultyChoice);
	});

	// add listeners to the shooter options buttons
	fighterOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleFighterChoice);
	});

	// add listeners to the canvas options buttons
	canvasOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleCanvasChoice);
	});

	// add listener to start game button
	startButton.addEventListener("click", handleStartButton);

	// add listener to the restart button (displayed in modal when the game has ended)
	restartGameBtn.addEventListener("click", function () {
		location.reload();
	});

	// visually display to the user what choice he has made for each option
	const setStyle = (element, option) => {
		switch (option) {
			case "difficulty":
				element.style.color = `var(--tint2)`;
				break;
			case "fighter":
				element.style.borderColor = `var(--${element.dataset.color})`;
				break;
			case "canvas":
				element.style.borderColor = "var(--tint2)";
				break;
		}
	};

	// reset styles of the options buttons when a user changes options
	const resetStyle = (option) => {
		switch (option) {
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

	// change canvas background image when user switches choices
	const setCanvasImage = (id) => {
		import(`../assets/space/${id.toLowerCase()}.png`).then((res) => {
			space.style.backgroundImage = `url(${res.default})`;
		});
	};

	// on each option click monitor if all mandatory options are selected to activate start game button
	const checkChoices = function () {
		if (isDifficultyChosen && isShooterChosen && isCanvasChosen) {
			startButton.disabled = false;
			startButton.focus();
		}
	};

	// set the game settings based on the selected user options
	const setGameSettings = (settingsObj, value) => {
		userGameSettings[settingsObj] = GAME_SETTING_OPTIONS[settingsObj][value];
	};

	function handleDifficultyChoice() {
		const option = "difficulty";
		isDifficultyChosen = true;
		resetStyle(option);
		setStyle(this, option);
		setGameSettings("difficultySettings", this.id);
		checkChoices();
	}

	function handleFighterChoice() {
		const option = "fighter";
		isShooterChosen = true;
		resetStyle(option);
		setStyle(this, option);
		setGameSettings("shooterSettings", this.dataset.color.toUpperCase());
		checkChoices();
	}

	function handleCanvasChoice() {
		const option = "canvas";
		isCanvasChosen = true;
		setCanvasImage(this.id);
		resetStyle(option);
		setStyle(this, option);
		checkChoices();
	}

	// start game
	function handleStartButton() {
		// instantiate the game class
		game = new SpaceShooter(userGameSettings);
		// remove the settings modal
		settingsModal.style.display = "none";
		// set height on hud to show it
		hud.style.height = "5vh";
		// change space (canvas) height to fit both hud and canvas at 100vh
		space.style.height = "95vh";
		// initiate game
		game.init();
	}
};

export { game };
export default START;
