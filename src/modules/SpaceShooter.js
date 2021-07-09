import { cooldownBar, space } from "./elements";
import EnemyBox from "./EnemyBox";
import Shooter from "./Shooter";

class SpaceShooter {
	constructor({ difficultySettings, shooterSettings }) {
		this.shooter = null;
		this.enemyBox = null;
		this.enemies = [];
		this.shooterSettings = shooterSettings;
		this.difficultySettings = difficultySettings;
		this.paused = false;

		this.decrementCoolDownBarHeightLevel = () => {
			if (this.shooter.coolDownBarHeightLevel < 0) {
				this.shooter.coolDownBarHeightLevel = 0;
				return;
			}
			if (!this.shooter.canShoot) {
				return;
			}

			cooldownBar.style.top = `-${(this.shooter.coolDownBarHeightLevel -= this.shooter.decrementLevel)}%`;
		};

		this.checkShootingPermission = () => {
			if (this.shooter.canShoot) {
				return;
			} else if (Date.now() - this.shooter.maxFireRateReachTime > this.shooter.laserCoolDownPeriod) {
				this.shooter.coolDownBarHeightLevel = 1;
				this.shooter.canShoot = true;
			}
		};

		this.moveCanvas = () => {
			space.animate([{ backgroundPositionY: 0 }, { backgroundPositionY: "256px" }], {
				duration: 1500,
				iterations: Infinity,
			});
		};

		this.gameLoop = () => {
			if (this.paused) {
				return;
			}
			this.shooter.actions();
			this.enemyBox.actions();
			this.monitorEnemyHit();
			this.checkShootingPermission();
			this.decrementCoolDownBarHeightLevel();
			requestAnimationFrame(this.gameLoop);
		};

		this.startGame = () => {
			requestAnimationFrame(this.gameLoop);
		};

		this.setPauseHandler = () => {
			document.addEventListener("keyup", this.handlePause);
		};

		this.handlePause = (e) => {
			if (!(e.key === "p" || e.key === "P")) {
				return;
			}
			this.paused = !this.paused;

			if (this.paused) {
				document.getAnimations().forEach((animation) => animation.pause());
				this.shooter.canShoot = false;
			}
			if (!this.paused) {
				document.getAnimations().forEach((animation) => animation.play());
				this.shooter.canShoot = true;
				this.startGame();
			}
		};

		this.endGame = () => {};

		this.monitorEnemyHit = () => {
			const liveShooterLaserNodeList = document.querySelectorAll(".laser");
			const liveEnemiesNodeList = document.querySelectorAll(".enemy");

			liveEnemiesNodeList.forEach((enemy) => {
				const r1 = enemy.getBoundingClientRect();

				for (let i = 0; i < liveShooterLaserNodeList.length; i++) {
					const r2 = liveShooterLaserNodeList[i].getBoundingClientRect();

					if (!(r1.top > r2.bottom || r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top)) {
						liveShooterLaserNodeList[i].remove();
						enemy.remove();
					} else {
						continue;
					}
				}
			});
		};

		this.monitorShooterHit = () => {};

		this.init = () => {
			this.shooter = new Shooter(shooterSettings);
			this.shooter.init();
			this.enemyBox = new EnemyBox(difficultySettings);
			this.enemyBox.init();
			this.moveCanvas();
			this.setPauseHandler();
			this.startGame();
		};
	}
}

export default SpaceShooter;
