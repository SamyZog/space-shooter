import Enemy from "./Enemy";
import EnemyBox from "./EnemyBox";
import Shooter from "./Shooter";

class SpaceShooter {
	constructor() {
		this.shooter = "";
		this.enemies = "";
		this.engine = () => {
			this.shooter.actions();
			requestAnimationFrame(this.engine);
		};
		this.setup = ({ type, difficulty }) => {
			// set game difficulty
			this.difficulty = difficulty;

			// shooter attributes (set based on user choice)
			let fireRate;
			let speed;
			switch (type) {
				case "red":
					speed = window.innerWidth / 300;
					fireRate = 2500;
					break;
				case "blue":
					speed = window.innerWidth / 500;
					fireRate = 2000;
					break;
				case "green":
					speed = window.innerWidth / 700;
					fireRate = 1500;
					break;
			}

			// create all elements and instantiate their classes
			const shooter = document.createElement("div");
			shooter.classList.add("shooter");
			this.shooter = new Shooter(shooter, type, speed, fireRate);
			this.shooter.init();

			const enemyBox = document.createElement("div");
			enemyBox.classList.add("enemy-box");
			this.enemyBox = new EnemyBox();

			const enemy = document.createElement("div");
			enemy.classList.add("enemy");
			this.enemy = new Enemy();

			// set canvas in motion to simulate flying in space
			const space = document.querySelector(".space");
			space.animate([{ backgroundPositionY: 0 }, { backgroundPositionY: "256px" }], {
				duration: 1000,
				easing: "linear",
				iterations: Infinity,
			});

			requestAnimationFrame(this.engine);
		};

		this.init = () => {};
	}
}

export default SpaceShooter;
