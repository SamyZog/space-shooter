import { space, spaceLeft, spaceRight } from "./elements";
import Enemy from "./Enemy";

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
		this.rightStartPosition = null;
		this.currentRightPosition = null;
	}

	actions() {
		this._move();
	}

	// movement

	_move() {
		this._moveHorizontally();
		this._moveVertically();
	}

	_moveHorizontally() {
		let enemyBoxLeftStyle;

		if (this.direction === 1) {
			enemyBoxLeftStyle = this.currentLeftPosition += this.enemySpeed;
		}
		if (this.direction === -1) {
			enemyBoxLeftStyle = this.currentRightPosition -= this.enemySpeed;
		}

		this.enemyBox.style.left = `${enemyBoxLeftStyle}px`;
	}

	_moveVertically() {
		this.enemyBoxRect = this.enemyBox.getBoundingClientRect();

		if (this.enemyBoxRect.left < spaceLeft) {
			this.top += this.height;
			this.enemyBox.style.top = `${this.top}px`;
			this.enemySpeed += 0.25;
			this.currentLeftPosition = this.leftStartPosition;
			this.direction = 1;
		}
		if (this.enemyBoxRect.right > spaceRight) {
			this.top += this.height;
			this.enemyBox.style.top = `${this.top}px`;
			this.enemySpeed += 0.25;
			this.currentRightPosition = this.rightStartPosition;
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
		this.rightStartPosition = spaceRight - this.enemyBoxWidth;
		this.currentRightPosition = spaceRight - this.enemyBoxWidth;
	}

	get totalEnemies() {
		return this.enemyColumns * this.enemyRows;
	}

	_populateEnemyContainer() {
		const enemyCellsArray = [...Array(this.totalEnemies)];

		enemyCellsArray.forEach((_, i) => {
			const enemyCell = document.createElement("div");
			enemyCell.classList.add("enemy-cell");

			const enemyDiv = document.createElement("div");
			enemyDiv.classList.add("enemy");

			const enemy = new Enemy({
				enemyDiv,
				id: i,
				difficulty: this.difficulty,
				laserSpeed: this.laserSpeed,
				enemyLaserColor: this.enemyLaserColor,
			});
			enemy.init();

			enemyCell.appendChild(enemyDiv);
			this.enemyBox.appendChild(enemyCell);
		});
	}
}

export default EnemyBox;
