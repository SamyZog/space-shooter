import { space } from "./elements";

class EnemyBox {
	constructor(element, difficulty) {
		this.element = element;
		this.difficulty = difficulty;
	}

	actions() {
		this.move();
	}

	move() {
		const enemiesRect = this.element.getBoundingClientRect();

		if (this.direction === 1) {
			this.element.style.left = `${(this.leftEdge += this.playbackRate)}px`;
		}

		if (this.direction === -1) {
			this.element.style.left = `${(this.rightEdge -= this.playbackRate)}px`;
		}

		if (enemiesRect.left < this.spaceEdges.left) {
			this.element.style.top = `${(this.top += 42)}px`;
			this.playbackRate += 0.25;
			this.leftEdge = this.startLeft;
			this.direction = 1;
		}
		if (enemiesRect.right > this.spaceEdges.right) {
			this.element.style.top = `${(this.top += 42)}px`;
			this.playbackRate += 0.25;
			this.rightEdge = this.startRight;
			this.direction = -1;
		}
	}

	setDifficulty() {
		let fireRate;

		switch (this.difficulty) {
			case "easy":
				this.grid = {
					rows: 4,
					columns: 6,
				};
				this.playbackRate = 1;
				fireRate = 3000;
				break;
			case "moderate":
				this.grid = {
					rows: 5,
					columns: 8,
				};
				this.playbackRate = 2;
				fireRate = 2000;
				break;
			case "hard":
				this.grid = {
					rows: 6,
					columns: 10,
				};
				this.playbackRate = 3;
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

		const boundingRect = space.getBoundingClientRect();

		this.spaceEdges = {
			top: boundingRect.top,
			bottom: boundingRect.bottom,
			left: boundingRect.left,
			right: boundingRect.right,
		};
		this.top = 0;
		this.leftEdge = 0;
		this.startLeft = 0;
		this.rightEdge = this.spaceEdges.right - this.element.offsetWidth;
		this.startRight = this.spaceEdges.right - this.element.offsetWidth;
		this.direction = 1;

		this.move();
	}
}

export default EnemyBox;
