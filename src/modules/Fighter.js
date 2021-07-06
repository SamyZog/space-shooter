class Fighter {
	constructor({ fighter, speed, fireRate, color }) {
		this.fighter = fighter;
		this.speed = speed;
		this.fireRate = fireRate;
		this.color = color;
		this.directions = {
			ArrowUp: false,
			ArrowDown: false,
			ArrowLeft: false,
			ArrowRight: false,
			[" "]: false,
		};
	}

	move() {}

	fire() {}

	die() {}

	init() {
		// handle key presses
		document.body.addEventListener("keydown", (e) => {
			if (e.key === "ArrowUp") {
				this.directions[e.key] = true;
			}
			if (e.key === "ArrowDown") {
				this.directions[e.key] = true;
			}
			if (e.key === "ArrowLeft") {
				this.directions[e.key] = true;
			}
			if (e.key === "ArrowRight") {
				this.directions[e.key] = true;
			}
		});
		document.body.addEventListener("keyup", function (e) {
			if (e.key === "ArrowLeft") {
				this.directions[e.key] = false;
			}
			if (e.key === "ArrowRight") {
				this.directions[e.key] = false;
			}
			if (e.key === "ArrowUp") {
				this.directions[e.key] = false;
			}
			if (e.key === "ArrowDown") {
				this.directions[e.key] = false;
			}
			if (e.key === " ") {
				this.fire();
				this.directions[e.key] = false;
			}
		});
	}
}

export default Fighter;
