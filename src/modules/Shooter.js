import { cooldownBar, hudShooterLives, space } from "./elements";
import { game } from "./start";

class Shooter {
	constructor({ laserSpeed, laserCoolDownPeriod, color, speed }) {
		this.audio = null;
		this.shooter = null;
		this.laserSpeed = laserSpeed;
		this.laserCoolDownPeriod = laserCoolDownPeriod;
		this.lives = game.difficultySettings.lives;
		this.color = color;
		this.speed = speed;
		this.canShoot = false;
		this.coolDownBarHeightLevel = 0;
		this.incrementLevel = 20;
		this.decrementLevel = 1;
		this.boundaries = null;
		this.maxFireRateReachTime = null;
		this.isDead = false;
		this.x = null;
		this.y = null;
		this.controlKeys = {
			ArrowLeft: false,
			ArrowRight: false,
			ArrowUp: false,
			ArrowDown: false,
			[" "]: false,
		};
	}

	showToolTip(msg) {
		this.toolTipDiv.innerText = msg;
		const toolTipAnimation = this.toolTipDiv.animate([{ top: "-50%", right: "-50%", opacity: 1 }], {
			duration: 500,
		});

		toolTipAnimation.finished.then((_) => {
			this.toolTipDiv.innerText = "";
			this.toolTipDiv.style.opacity = "0";
		});
	}

	set currentPosition(coords) {
		const [x, y] = coords;
		this.shooter.style.transform = `translate(${x}px, ${y}px`;
	}

	// to game engine

	actions() {
		this._move();
	}

	// shooting

	shoot() {
		if (this.coolDownBarHeightLevel > 100) {
			this.canShoot = false;
			this.maxFireRateReachTime = Date.now();
			setTimeout(() => {
				this.coolDownBarHeightLevel = 1;
				this.canShoot = true;
			}, this.laserCoolDownPeriod);
			return;
		}

		this._incrementCoolDownBarHeightLevel();
		this._setLiveShooterPosition();
		this._createLaser();
	}

	_incrementCoolDownBarHeightLevel = () => {
		if (this.canShoot) {
			cooldownBar.style.top = `-${(this.coolDownBarHeightLevel += this.incrementLevel)}%`;
		}
	};

	_setLiveShooterPosition() {
		this.shooterY = this.shooter.getBoundingClientRect().top;
		this.shooterX = this.shooter.getBoundingClientRect().left;
	}

	_createLaser() {
		const laser = document.createElement("div");
		laser.classList.add("laser");

		laser.style.backgroundColor = `var(--${this.color})`;
		laser.style.top = `${this.shooterY - laser.offsetHeight}px`;
		laser.style.left = `${this.shooterX + this.shooterWidth / 2}px`;

		const laserFireAnimation = laser.animate(
			[{ transform: `translateY(-${space.getBoundingClientRect().bottom}px)` }],
			{
				duration: this.laserSpeed,
				fill: "forwards",
			},
		);

		laserFireAnimation.finished.then((res) => {
			laser.remove();
		});

		space.appendChild(laser);
	}

	// movement

	_move() {
		if (this.controlKeys.ArrowUp) {
			this.x = this.x;
			this.y -= this.speed;
		}

		if (this.controlKeys.ArrowDown) {
			this.x = this.x;
			this.y += this.speed;
		}

		if (this.controlKeys.ArrowLeft) {
			this.x -= this.speed;
			this.y = this.y;
		}

		if (this.controlKeys.ArrowRight) {
			this.x += this.speed;
			this.y = this.y;
		}

		this.currentPosition = [this.x, this.y];
		this._checkLimits();
	}

	_checkLimits() {
		const bounds = this.boundaries;

		if (this.x < bounds.leftEdge) {
			this.x = bounds.leftEdge;
		}
		if (this.x > bounds.rightEdge) {
			this.x = bounds.rightEdge;
		}
		if (this.y < bounds.topEdge) {
			this.y = bounds.topEdge;
		}
		if (this.y > bounds.bottomEdge) {
			this.y = bounds.bottomEdge;
		}

		this.currentPosition = [this.x, this.y];
	}

	// initialization

	init() {
		const shooterDiv = document.createElement("div");
		this.shooter = shooterDiv;
		shooterDiv.classList.add("shooter");
		const toolTip = document.createElement("div");
		this.toolTipDiv = toolTip;
		toolTip.classList.add("shooter__tooltip");
		shooterDiv.appendChild(toolTip);
		space.appendChild(shooterDiv);
		this.shooterWidth = shooterDiv.offsetWidth;

		this._setImage();
		this._setLives();
		this._setActionHandlers();
		this._setInitialPosition();
		this._setMovementBoundaries();
	}

	_setImage() {
		import(`../assets/fighter/${this.color}.png`).then((res) => {
			this.shooter.style.backgroundImage = `url(${res.default})`;
			const hudShooterImg = document.querySelector(".hud__shooter-img");
			hudShooterImg.style.backgroundImage = `url(${res.default})`;
		});
	}

	_setLives() {
		hudShooterLives.innerText = `x${this.lives}`;
	}

	_setInitialPosition() {
		this.x = space.getBoundingClientRect().right / 2 - this.shooter.offsetWidth / 2;
		this.y = space.getBoundingClientRect().bottom - this.shooter.offsetHeight;
		this.currentPosition = [this.x, this.y];
	}

	_setMovementBoundaries() {
		this.boundaries = {
			topEdge: space.getBoundingClientRect().bottom * 0.75,
			bottomEdge: space.getBoundingClientRect().bottom - this.shooter.offsetHeight,
			leftEdge: space.getBoundingClientRect().left,
			rightEdge: space.getBoundingClientRect().right - this.shooter.offsetWidth,
		};
	}

	_setActionHandlers() {
		document.body.addEventListener("keydown", (e) => {
			if (e.key === "ArrowUp") {
				this.controlKeys[e.key] = true;
			}
			if (e.key === "ArrowDown") {
				this.controlKeys[e.key] = true;
			}
			if (e.key === "ArrowLeft") {
				this.controlKeys[e.key] = true;
			}
			if (e.key === "ArrowRight") {
				this.controlKeys[e.key] = true;
			}
			if (e.key === "Shift") {
				this.activateShield();
			}
		});

		document.body.addEventListener("keyup", (e) => {
			if (e.key === "ArrowLeft") {
				this.controlKeys[e.key] = false;
			}
			if (e.key === "ArrowRight") {
				this.controlKeys[e.key] = false;
			}
			if (e.key === "ArrowUp") {
				this.controlKeys[e.key] = false;
			}
			if (e.key === "ArrowDown") {
				this.controlKeys[e.key] = false;
			}
			if (e.key === " ") {
				if (!this.canShoot) {
					return;
				}
				this.shoot();
				this.controlKeys[e.key] = false;
			}
		});
	}
}

export default Shooter;
