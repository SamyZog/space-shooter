class Enemy {
	constructor({ enemyDiv, id, difficulty, laserSpeed, enemyLaserColor }) {
		this.enemyDiv = enemyDiv;
		this.id = id;
		this.difficulty = difficulty;
		this.laserSpeed = laserSpeed;
		this.enemyLaserColor = enemyLaserColor;
	}

	init() {
		import(`../assets/enemy/${this.difficulty}.png`).then(
			(res) => (this.enemyDiv.style.backgroundImage = `url(${res.default})`),
		);
	}
}

export default Enemy;
