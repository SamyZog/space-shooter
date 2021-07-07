import EnemyBox from "./EnemyBox";
import Shooter from "./Shooter";

class SpaceShooter {
	constructor() {
		this.shooter = "";
		this.enemies = "";
		this.engine = () => {
			this.shooter.actions();
			this.monitorInvaderHit();
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
			this.enemyContainer = new EnemyBox(enemyBox, this.difficulty);
			this.enemyContainer.init();

			// set canvas in motion to simulate flying in space
			const space = document.querySelector(".space");
			space.animate([{ backgroundPositionY: 0 }, { backgroundPositionY: "256px" }], {
				duration: 1500,
				easing: "linear",
				iterations: Infinity,
			});

			requestAnimationFrame(this.engine);
		};

		this.monitorInvaderHit = () => {
			const enemyArray = [...document.querySelectorAll(".enemy")];
			const lasersArray = [...document.querySelectorAll(".laser")];

			enemyArray.forEach((enemy) => {
				const r1 = enemy.getBoundingClientRect();
				for (let i = 0; i < lasersArray.length; i++) {
					const r2 = lasersArray[i].getBoundingClientRect();
					if (!(r1.top > r2.bottom || r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top)) {
						enemy.remove();
						lasersArray[i].remove();
					} else {
						continue;
					}
				}
			});
		};
	}
}

export default SpaceShooter;
