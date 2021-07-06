import Fighter from "./Fighter";

class Game {
	constructor() {
		this.name = "Space-Shooter";
		this.engine = () => {
			this.fighter.move();
		};
		this.init = ({ fighter, canvas }) => {
			// initiate attributes for fighter class
			const attrs = {
				fighter: "",
				speed: "",
				fireRate: "",
				color: fighter,
			};

			// create the div element that will represent the fighter
			const fighterDiv = document.createElement("div");
			fighterDiv.classList.add("fighter");

			// assign values to fighters according to their class (res, blue, green)
			switch (fighter) {
				case "red":
					attrs.speed = window.innerWidth / 250;
					attrs.fireRate = 1500;
					break;
				case "blue":
					attrs.speed = window.innerWidth / 500;
					attrs.fireRate = 2000;
					break;
				case "green":
					attrs.speed = window.innerWidth / 750;
					attrs.fireRate = 2500;
					break;
			}

			import(`../assets/fighter/${fighter}.png`).then((res) => {
				fighterDiv.style.backgroundImage = `url(${res.default})`;
			});

			attrs.fighter = fighterDiv;

			this.fighter = new Fighter(attrs);

			console.log(this);
		};
	}
}

export default Game;
