import Enemy from "./Enemy";
import Fighter from "./Fighter";

class Game {
	constructor() {
		this.name = "Space-Shooter";
		this.hit = (r1, r2) => {
			return !(r1.top > r2.bottom || r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top);
		};
		this.engine = () => {
			this.fighter.actions();
			this.killEnemy();
			requestAnimationFrame(this.engine);
		};
		this.killEnemy = () => {};
		this.killFighter = () => {};
		this.init = (fighter) => {
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

			// create enemy grid
			const enemyGrid = document.createElement("div");
			enemyGrid.classList.add("enemies");

			// assign values to fighters according to their class (res, blue, green)
			switch (fighter) {
				case "red":
					attrs.speed = window.innerWidth / 300;
					attrs.fireRate = 2500;
					break;
				case "blue":
					attrs.speed = window.innerWidth / 500;
					attrs.fireRate = 2000;
					break;
				case "green":
					attrs.speed = window.innerWidth / 700;
					attrs.fireRate = 1500;
					break;
			}

			import(`../assets/fighter/${fighter}.png`).then((res) => {
				fighterDiv.style.backgroundImage = `url(${res.default})`;
			});

			attrs.fighter = fighterDiv;

			// instantiate and initiate the fighter
			this.fighter = new Fighter(attrs);
			this.fighter.init();

			import("../assets/sound-effects/sfx_laser2.ogg").then((res) => {
				const audioEl = new Audio(res.default);
				audioEl.preload = true;
				this.fighter.laserAudio = audioEl;
			});

			this.enemies = new Enemy(enemyGrid);
			this.enemies.init();

			this.raf = requestAnimationFrame(this.engine);
		};
	}
}

export default Game;
