import { cooldownBar, space } from "./elements";

class Shooter {
	constructor(element, type, speed, fireRate) {
		this.element = element;
		this.type = type;
		this.speed = speed;
		this.coolDownPeriod = 2500;
		this.canShoot = true;
		this.fireRate = fireRate;
		this.cool = 0;
		this.activeControlKeys = {
			ArrowLeft: false,
			ArrowRight: false,
			ArrowUp: false,
			ArrowDown: false,
			[" "]: false,
		};
	}

	actions() {
		this.move();
		this.checkLimits();
		this.decrementCoolDown();
		this.coolDownControl();
	}

	checkLimits() {
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

		this.element.style.transform = `translate(${this.x}px, ${this.y}px`;
	}

	move() {
		if (this.activeControlKeys.ArrowUp) {
			this.element.style.transform = `translate(${this.x}px, ${(this.y -= this.speed)}px)`;
		}

		if (this.activeControlKeys.ArrowDown) {
			this.element.style.transform = `translate(${this.x}px, ${(this.y += this.speed)}px)`;
		}

		if (this.activeControlKeys.ArrowLeft) {
			this.element.style.transform = `translate(${(this.x -= this.speed)}px, ${this.y}px)`;
		}

		if (this.activeControlKeys.ArrowRight) {
			this.element.style.transform = `translate(${(this.x += this.speed)}px, ${this.y}px)`;
		}
	}

	coolDownControl() {
		if (this.canShoot) {
			return;
		}
		if (Date.now() - this.maxFireRateTime > this.coolDownPeriod) {
			this.cool = 1;
			this.canShoot = true;
		}
	}

	decrementCoolDown() {
		if (this.cool < 0) {
			this.cool = 0;
			return;
		}
		if (!this.canShoot) {
			return;
		}
		this.cool -= 1;
		cooldownBar.style.top = `-${this.cool}%`;
	}

	fire() {
		if (this.cool > 100) {
			this.canShoot = false;
			this.maxFireRateTime = Date.now();
			return;
		}
		cooldownBar.style.top = `-${(this.cool += 25)}%`;

		const laser = document.createElement("div");

		const fighterX = this.element.getBoundingClientRect().left;
		const fighterY = this.element.getBoundingClientRect().top;
		const fighterWidth = this.element.offsetWidth;

		laser.classList.add("laser");
		space.appendChild(laser);

		laser.style.backgroundColor = `var(--${this.type})`;
		laser.style.top = `${fighterY - laser.offsetHeight}px`;
		laser.style.left = `${fighterX + fighterWidth / 2}px`;

		const laserFireAnimation = laser.animate([{ top: `-${laser.offsetHeight}px` }], {
			duration: this.fireRate,
			fill: "forwards",
			easing: "linear",
		});

		laserFireAnimation.finished.then((res) => {
			// lasers first in first out
			laser.remove();
		});
	}

	init() {
		// set the image of the chosen shooter
		import(`../assets/fighter/${this.type}.png`).then((res) => {
			this.element.style.backgroundImage = `url(${res.default})`;
		});
		// movement logic initiation
		document.body.addEventListener("keydown", (e) => {
			if (e.key === "ArrowUp") {
				this.activeControlKeys[e.key] = true;
			}
			if (e.key === "ArrowDown") {
				this.activeControlKeys[e.key] = true;
			}
			if (e.key === "ArrowLeft") {
				this.activeControlKeys[e.key] = true;
			}
			if (e.key === "ArrowRight") {
				this.activeControlKeys[e.key] = true;
			}
		});
		document.body.addEventListener("keyup", (e) => {
			if (e.key === "ArrowLeft") {
				this.activeControlKeys[e.key] = false;
			}
			if (e.key === "ArrowRight") {
				this.activeControlKeys[e.key] = false;
			}
			if (e.key === "ArrowUp") {
				this.activeControlKeys[e.key] = false;
			}
			if (e.key === "ArrowDown") {
				this.activeControlKeys[e.key] = false;
			}
			if (e.key === " ") {
				if (!this.canShoot) {
					return;
				}
				this.fire();
				this.activeControlKeys[e.key] = false;
			}
		});

		// append shooter element to canvas
		space.appendChild(this.element);

		// set movement boundaries
		const spaceBoundaries = space.getBoundingClientRect();
		this.x = spaceBoundaries.right / 2 - this.element.offsetWidth / 2;
		this.y = spaceBoundaries.bottom - this.element.offsetHeight - 20;
		this.boundaries = {
			topEdge: spaceBoundaries.bottom * 0.75,
			bottomEdge: spaceBoundaries.bottom - this.element.offsetHeight,
			leftEdge: spaceBoundaries.left,
			rightEdge: spaceBoundaries.right - this.element.offsetWidth,
		};

		// initial shooter position on first appearance
		this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
	}
}

export default Shooter;
