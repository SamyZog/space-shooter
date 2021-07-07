import {
	canvasOptionsButtons,
	difficultyOptionsButtons,
	greetingModal,
	hud,
	shooterOptionsButtons,
	space,
	startButton,
} from "./elements";
import SpaceShooter from "./SpaceShooter";

let game;

const START = () => {
	const gameSettings = {
		type: "",
		difficulty: "",
	};

	hud.style.display = "none";

	const setGameSettings = (key, value) => {
		gameSettings[key] = value;
	};

	difficultyOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleDifficultyChoice);
	});

	shooterOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleShooterChoice);
	});

	canvasOptionsButtons[3].style.outline = "2px solid var(--light)";

	canvasOptionsButtons.forEach((button) => {
		button.addEventListener("click", handleCanvasChoice);
	});

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
		import(`../assets/space/${id}.png`).then((res) => {
			space.style.backgroundImage = `url(${res.default})`;
		});
	};

	const checkChoices = function () {
		if (gameSettings.type && gameSettings.difficulty) {
			startButton.disabled = false;
		}
	};

	function handleDifficultyChoice() {
		const index = "difficulty";
		resetOutline(index);
		setOutline(this);
		setGameSettings(index, this.id);
		checkChoices();
	}

	function handleShooterChoice() {
		resetOutline("shooter");
		setOutline(this);
		setGameSettings("type", this.id);
		checkChoices();
	}

	function handleCanvasChoice() {
		resetOutline("canvas");
		setOutline(this);
		setCanvasImage(this.id);
	}

	function handleStartButton() {
		hud.style.display = "flex";
		game = new SpaceShooter();
		game.setup(gameSettings);
		greetingModal.style.display = "none";
	}
};

export { space, game };
export default START;
