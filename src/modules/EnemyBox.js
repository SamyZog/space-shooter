import { space } from "./elements";

class EnemyBox {
	constructor(element, difficulty) {
		this.element = element;
		this.difficulty = difficulty;
	}

	move() {
		this.animationRef = this.element.animate([{ left: this.leftEdge }, { left: `${this.rightEdge}px` }], {
			duration: this.speed,
			easing: "linear",
			fill: "forwards",
		});

		this.animationRef.finished.then((_) => {
			this.element.style.top = `${(this.top += 42)}px`;
			this.reverse();
			this.animationRef.updatePlaybackRate((this.playbackRate += 0.25));
		});
	}

	reverse() {
		this.animationRef = this.element.animate([{ left: `${this.rightEdge}px` }, { left: this.leftEdge }], {
			duration: this.speed,
			easing: "linear",
			fill: "forwards",
		});

		this.animationRef.finished.then((_) => {
			this.element.style.top = `${(this.top += 42)}px`;
			this.move();
			this.animationRef.updatePlaybackRate((this.playbackRate += 0.25));
		});
	}

	setDifficulty() {
		let fireRate;

		switch (this.difficulty) {
			case "easy":
				this.grid = {
					rows: 4,
					columns: 6,
				};
				this.speed = 8000;
				fireRate = 3000;
				break;
			case "moderate":
				this.grid = {
					rows: 5,
					columns: 8,
				};
				this.speed = 5000;
				fireRate = 2000;
				break;
			case "hard":
				this.grid = {
					rows: 6,
					columns: 10,
				};
				this.speed = 3000;
				fireRate = 1000;
				break;
		}
	}

	init() {
		this.setDifficulty();

		this.element.style.gridTemplateColumns = `repeat(${this.grid.columns}, ${
			this.difficulty === "moderate" ? "5.15" : "4.65"
		}rem)`;
		this.element.style.gridTemplateRows = `repeat(${this.grid.rows}, 4.2rem)`;

		// fill the grid
		[...Array(this.grid.columns * this.grid.rows)].forEach((cell) => {
			// we make cells in which our enemy elements will sit to prevent grid item collapsing when hit by laser
			const enemyCell = document.createElement("div");
			enemyCell.classList.add("enemy-cell");

			// create and instantiate each enemy
			const enemy = document.createElement("div");
			enemy.classList.add("enemy");
			import(`../assets/enemy/${this.difficulty}.png`).then(
				(res) => (enemy.style.backgroundImage = `url(${res.default})`),
			);

			enemyCell.appendChild(enemy);
			this.element.appendChild(enemyCell);
		});

		space.appendChild(this.element);

		// set initial positions
		this.leftEdge = 0;
		this.top = 0;
		// set right border of when the grid should drop and get closer to shooter
		this.rightEdge = space.getBoundingClientRect().right - this.element.offsetWidth;
		// initial playback rate
		this.playbackRate = 1;
		this.move();
	}
}

export default EnemyBox;
