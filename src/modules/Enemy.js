import { space, spaceBottom } from "./elements";

class Enemy {
	constructor({ enemyDiv, id, difficulty, laserSpeed, enemyLaserColor, columns }) {
		this.enemyDiv = enemyDiv;
		this.id = id;
		this.difficulty = difficulty;
		this.laserSpeed = laserSpeed;
		this.enemyLaserColor = enemyLaserColor;
		this.columns = columns;
		this.canShoot = false;
		this.enemyX = null;
		this.enemyY = null;
		this.enemyWidth = null;
		this.interval = Math.ceil(Math.random() * 3);
	}

	start() {
		const liveEnemyCellNodeList = document.querySelectorAll(".enemy-cell");
		if (this._isPresent(liveEnemyCellNodeList) && this._hasClearShot(liveEnemyCellNodeList)) {
			this.shoot();
		}
	}

	// shooting

	shoot() {
		this._setLiveEnemyPosition();
		this._createLaser();
	}

	_setLiveEnemyPosition() {
		this.enemyY = this.enemyDiv.getBoundingClientRect().top;
		this.enemyX = this.enemyDiv.getBoundingClientRect().left;
	}

	_createLaser() {
		const enemyLaser = document.createElement("div");
		enemyLaser.classList.add("enemy-laser");

		enemyLaser.style.backgroundColor = this.enemyLaserColor;
		enemyLaser.style.top = `${this.enemyY + this.enemyDiv.offsetHeight}px`;
		enemyLaser.style.left = `${this.enemyX + this.enemyWidth / 2}px`;

		const enemylaserFireAnimation = enemyLaser.animate([{ transform: `translateY(${spaceBottom}px)` }], {
			duration: this.laserSpeed,
			fill: "forwards",
		});

		enemylaserFireAnimation.finished.then((res) => {
			enemyLaser.remove();
		});

		space.appendChild(enemyLaser);
	}

	_hasClearShot(list) {
		for (let i = this.id + this.columns; i < list.length; i += this.columns) {
			if (list[i].hasChildNodes()) {
				return false;
			}
		}
		return true;
	}

	_isPresent(list) {
		return list[this.id].hasChildNodes();
	}

	// initialization

	init() {
		this.enemyWidth = this.enemyDiv.offsetWidth;
		this._setImage();
	}

	_setImage() {
		let interval = Math.ceil(Math.random() * 3000);
		import(`../assets/enemy/${this.difficulty}.png`).then((res) => {
			this.enemyDiv.style.backgroundImage = `url(${res.default})`;
			const _randomizeShooting = () => {
				this.start();
				interval = Math.ceil(Math.random() * 3000);
				setTimeout(_randomizeShooting, interval);
			};
			setTimeout(_randomizeShooting, interval);
		});
	}
}

export default Enemy;
