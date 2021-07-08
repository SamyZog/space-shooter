import { space, spaceBottom, spaceLeft, spaceRight, spaceTop } from "./elements";
import Enemy from "./Enemy";

class EnemyBox {
	constructor(element, difficulty) {}

	_createElement() {}

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

	setSettings() {
		switch (this.difficulty) {
			case "easy":
				this.grid = {
					rows: 4,
					columns: 6,
				};
				this.playbackRate = 1;
				this.fireRate = 3000;
				this.enemyLaserColor = "#5F9EA0";
				break;
			case "moderate":
				this.grid = {
					rows: 5,
					columns: 8,
				};
				this.playbackRate = 2;
				this.fireRate = 2000;
				this.enemyLaserColor = "#FF8C00";
				break;
			case "hard":
				this.grid = {
					rows: 6,
					columns: 10,
				};
				this.playbackRate = 3;
				this.fireRate = 1000;
				this.enemyLaserColor = "#F0FFFF";
				break;
		}
	}

	init() {
		this.setSettings();

		this.element.style.gridTemplateColumns = `repeat(${this.grid.columns}, ${
			this.difficulty === "moderate" ? "5.15" : "4.65"
		}rem)`;
		this.element.style.gridTemplateRows = `repeat(${this.grid.rows}, 4.2rem)`;

		const cellsArray = [...Array(this.grid.columns * this.grid.rows)];

		// fill the grid
		cellsArray.forEach((cell, i) => {
			// we make cells in which our enemy elements will sit to prevent grid item collapsing when hit by laser
			const enemyCell = document.createElement("div");
			enemyCell.classList.add("enemy-cell");

			// create and instantiate each enemy
			const enemy = document.createElement("div");
			enemy.classList.add("enemy");
			import(`../assets/enemy/${this.difficulty}.png`).then(
				(res) => (enemy.style.backgroundImage = `url(${res.default})`),
			);
			this.enemyArray.push(
				new Enemy(
					enemy,
					i,
					this.grid.columns,
					this.grid.rows,
					this.grid.columns * this.grid.rows,
					this.enemyLaserColor,
					this.fireRate,
				),
			);

			enemyCell.appendChild(enemy);
			this.element.appendChild(enemyCell);
		});

		console.log(this.enemyArray);
		this.enemyArray.forEach((enemy) => enemy.init());

		space.appendChild(this.element);

		this.spaceEdges = {
			top: spaceTop,
			bottom: spaceBottom,
			left: spaceLeft,
			right: spaceRight,
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
