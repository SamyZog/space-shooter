import { space } from "./elements";
import Enemy from "./Enemy";
import { game } from "./start";

class EnemyBox {
	constructor({ difficulty, enemySpeed, laserSpeed, enemyColumns, enemyRows, enemyLaserColor, height, width }) {
		this.enemyBox = null;
		this.enemyBoxRect = null;
		this.enemyBoxWidth = null;
		this.difficulty = difficulty;
		this.enemySpeed = enemySpeed;
		this.laserSpeed = laserSpeed;
		this.enemyColumns = enemyColumns;
		this.enemyRows = enemyRows;
		this.enemyLaserColor = enemyLaserColor;
		this.height = height;
		this.width = width;
		this.direction = 1;
		this.top = 0;
		this.leftStartPosition = 0;
		this.currentLeftPosition = 0;
	}

	// to game engine

	actions() {
		this._move();
	}

	// movement

	_move() {
		this._moveHorizontally();
		this._moveVertically();
	}

	_moveHorizontally() {
		if (this.direction === 1) {
			this.enemyBox.style.left = `${(this.currentLeftPosition += this.enemySpeed)}px`;
		}
		if (this.direction === -1) {
			this.enemyBox.style.left = `${(this.currentLeftPosition -= this.enemySpeed)}px`;
		}
	}

	_moveVertically() {
		this.enemyBoxRect = this.enemyBox.getBoundingClientRect();

		if (this.enemyBoxRect.left < this.leftStartPosition) {
			this.top += this.height;
			this.enemyBox.style.top = `${this.top}px`;
			this.enemySpeed += 0.25;
			this.direction = 1;
		}
		if (this.enemyBoxRect.right > space.getBoundingClientRect().right) {
			this.top += this.height;
			this.enemyBox.style.top = `${this.top}px`;
			this.enemySpeed += 0.25;
			this.direction = -1;
		}
	}

	// initialization

	init() {
		const enemyContainer = document.createElement("div");
		this.enemyBox = enemyContainer;
		enemyContainer.classList.add("enemy-box");
		enemyContainer.style.gridTemplateColumns = `repeat(${this.enemyColumns}, ${this.width}px)`;
		enemyContainer.style.gridTemplateRows = `repeat(${this.enemyRows}, ${this.height}px)`;

		this._populateEnemyContainer();
		space.appendChild(enemyContainer);

		this.enemyBoxWidth = enemyContainer.offsetWidth;
		this.leftStartPosition = 0;
		this.currentLeftPosition = 0;
		this.rightStartPosition = space.getBoundingClientRect().right - this.enemyBoxWidth;
		this.currentRightPosition = space.getBoundingClientRect().right - this.enemyBoxWidth;
	}

	get totalEnemies() {
		return this.enemyColumns * this.enemyRows;
	}

	_populateEnemyContainer() {
		[...Array(this.totalEnemies)].forEach((_, i) => {
			const enemyCell = document.createElement("div");
			enemyCell.classList.add("enemy-cell");

			const enemyDiv = document.createElement("div");
			enemyDiv.classList.add("enemy");
			enemyDiv.style.height = `${this.height}px`;
			enemyDiv.style.width = `${this.width}px`;

			enemyCell.appendChild(enemyDiv);
			this.enemyBox.appendChild(enemyCell);

			const enemy = new Enemy({
				enemyDiv,
				id: i,
				difficulty: this.difficulty,
				laserSpeed: this.laserSpeed,
				enemyLaserColor: this.enemyLaserColor,
				columns: this.enemyColumns,
				rows: this.enemyRows,
			});

			enemy.init();
			game.enemyInstances.push(enemy);
		});
	}
}

export default EnemyBox;
