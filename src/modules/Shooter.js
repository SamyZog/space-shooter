import { cooldownBar, space, spaceBottom, spaceLeft, spaceRight } from "./elements";

class Shooter {
	constructor({ laserSpeed, laserCoolDownPeriod, color, speed }) {
		this.shooter = null;
		this.laserSpeed = laserSpeed;
		this.laserCoolDownPeriod = laserCoolDownPeriod;
		this.color = color;
		this.speed = speed;
		this.canShoot = true;
		this.coolDownBarHeightLevel = 0;
		this.incrementLevel = 20;
		this.decrementLevel = 1;
		this.boundaries = null;
		this.maxFireRateReachTime = null;
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

	// to game engine

	actions() {
		this._move();
	}

	// shooting

	shoot() {
		if (this.coolDownBarHeightLevel > 100) {
			this.canShoot = false;
			this.maxFireRateReachTime = Date.now();
			return;
		}

		this._incrementCoolDownBarHeightLevel();
		this._setLiveShooterPosition();
		this._createLaser();
	}

	_incrementCoolDownBarHeightLevel = () => {
		cooldownBar.style.top = `-${(this.coolDownBarHeightLevel += this.incrementLevel)}%`;
	};

	_setLiveShooterPosition() {
		this.shooterY = this.shooter.getBoundingClientRect().top;
		this.shooterX = this.shooter.getBoundingClientRect().left;
	}

	_createLaser() {
		const laser = document.createElement("div");
		laser.classList.add("laser");
		space.appendChild(laser);

		laser.style.backgroundColor = `var(--${this.color})`;
		laser.style.top = `${this.shooterY - laser.offsetHeight}px`;
		laser.style.left = `${this.shooterX + this.shooterWidth / 2}px`;

		const laserFireAnimation = laser.animate([{ transform: `translateY(-${spaceBottom}px)` }], {
			duration: this.laserSpeed,
			fill: "forwards",
		});

		laserFireAnimation.finished.then((res) => {
			laser.remove();
		});
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

		this.shooter.style.transform = `translate(${this.x}px, ${this.y}px)`;

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

		this.shooter.style.transform = `translate(${this.x}px, ${this.y}px`;
	}

	// initialization

	init() {
		const shooterDiv = document.createElement("div");
		this.shooter = shooterDiv;
		shooterDiv.classList.add("shooter");
		space.appendChild(shooterDiv);
		this.shooterWidth = shooterDiv.offsetWidth;

		this._setImage();
		this._setInitialPosition();
		this._setMovementBoundaries();
		this._setActionHandlers();
	}

	_setImage() {
		import(`../assets/fighter/${this.color}.png`).then((res) => {
			this.shooter.style.backgroundImage = `url(${res.default})`;
		});
	}

	_setInitialPosition() {
		this.x = spaceRight / 2 - this.shooter.offsetWidth / 2;
		this.y = spaceBottom - this.shooter.offsetHeight - 20;
		this.shooter.style.transform = `translate(${this.x}px, ${this.y}px)`;
	}

	_setMovementBoundaries() {
		this.boundaries = {
			topEdge: spaceBottom * 0.75,
			bottomEdge: spaceBottom - this.shooter.offsetHeight,
			leftEdge: spaceLeft,
			rightEdge: spaceRight - this.shooter.offsetWidth,
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
