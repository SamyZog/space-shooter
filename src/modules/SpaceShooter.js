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
				duration: 2000,
				iterations: Infinity,
			});
		};

		this.gameLoop = () => {
			this.shooter.actions();
			this.enemyBox.actions();
			this.checkShootingPermission();
			this.decrementCoolDownBarHeightLevel();
			requestAnimationFrame(this.gameLoop);
		};

		this.startGame = () => {
			requestAnimationFrame(this.gameLoop);
		};

		this.setPauseHandler = () => {};

		this.endGame = () => {};

		this.monitorInvaderHit = () => {};

		this.monitorShooterHit = () => {};

		this.init = () => {
			this.shooter = new Shooter(shooterSettings);
			this.shooter.init();
			this.enemyBox = new EnemyBox(difficultySettings);
			this.enemyBox.init();
			this.moveCanvas();
			this.startGame();
		};
	}
}

export default SpaceShooter;
