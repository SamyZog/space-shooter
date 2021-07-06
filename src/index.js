import Game from "./modules/Game";
import "./sass/main.scss";

let spaceShooter;

const settings = {
	fighter: "",
	canvas: "",
};

// first client interaction modal
const greeting = document.querySelector(".greeting");

// the canvas
const space = document.querySelector(".space");

// div containing buttons to choose fighter class
const fighterOptions = document.querySelector(".fighter-options");

// div containing button to choose canvas brightness
const canvasOptions = document.querySelector(".canvas-options");

// buttons nodelist for choosing fighter class (needed for looping through and removing outline when another button is clicked)
const fighterChoiceBtns = document.querySelectorAll(".fighter-options > button");
// buttons nodelist for choosing canvas brightness (needed for looping through and removing outline when another button is clicked)
const canvasChoiceBtns = document.querySelectorAll(".canvas-options > button");

// the start button to start the game, disabled initially, it is enabled when the user chooses a fighter class and canvas background
const startBtn = document.querySelector(".start");
startBtn.disabled = true;

startBtn.addEventListener("click", () => {
	// initiates the game, all game start logic is housed in this method
	spaceShooter = new Game().init(settings);
	greeting.remove();
});

// checks if user has both choices selected, if not startBtn stays disabled
function checkUserChoices() {
	if (settings.fighter) {
		startBtn.disabled = false;
		return;
	}
}

// delegate event to buttons
fighterOptions.addEventListener("click", function (e) {
	fighterChoiceBtns.forEach((btn) => {
		// remove outline from all buttons on each click
		btn.style.outline = "none";
	});
	const btn = e.target.closest("button");
	settings.fighter = btn.id;
	// add the outline to the specific choice to let user visually know what was clicked
	btn.style.outline = "2px solid var(--tint1)";
	checkUserChoices();
});

// delegate event to buttons
canvasOptions.addEventListener("click", function (e) {
	canvasChoiceBtns.forEach((btn) => {
		// remove outline from all buttons on each click
		btn.style.outline = "none";
	});
	const btn = e.target.closest("button");
	// dynamically import background image that the user selected
	import(`./assets/space/${btn.id}.png`).then((res) => {
		space.style.backgroundImage = `url(${res.default})`;
	});
	// add the outline to the specific choice to let user visually know what was clicked
	btn.style.outline = "2px solid var(--tint1)";
	checkUserChoices();
});
