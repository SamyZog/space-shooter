import {
	cooldownBar,
	hudScore,
	hudShooterLives,
	modal,
	modalActionBox,
	modalMsg,
	modalScore,
	modalStatsBox,
	modalTime,
	space,
} from "./elements";
import EnemyBox from "./EnemyBox";
import Shooter from "./Shooter";

class SpaceShooter {
	constructor({ difficultySettings, shooterSettings }) {
		this.shooter = null;
		this.enemyBox = null;
		this.enemies = [];
		this.startTime = null;
		this.startGameMsgs = {
			ready: "Get Ready!",
			go: "GO!",
		};
		this.playerScore = 0;
		this.enemyInstances = [];
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
				duration: 1000,
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
			this.monitorShooterHit();
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
				this.pauseAction();
			}
			if (!this.paused) {
				this.unPauseAction();
			}
		};

		this.pauseAction = () => {
			document.getAnimations().forEach((animation) => animation.pause());
			this.shooter.canShoot = false;
			this.enemyInstances.forEach((instance) => {
				instance.canShoot = false;
			});
			modal.style.display = "flex";
			modal.style.width = "30vw";
			modalMsg.innerText = "PAUSED!";
		};

		this.resetModal = () => {
			modal.style.display = "none";
			modal.style.width = "auto";
			modalStatsBox.style.display = "grid";
			modalActionBox.style.display = "flex";
			modalMsg.innerText = "";
		};

		this.unPauseAction = () => {
			this.resetModal();
			document.getAnimations().forEach((animation) => animation.play());
			this.shooter.canShoot = true;
			this.startGame();
			this.enemyInstances.forEach((instance) => {
				instance.canShoot = true;
				instance.randomizeShooting();
			});
		};

		this.updateScore = () => {
			this.playerScore += 100;
			hudScore.innerText = this.playerScore;
		};

		this.updateLives = () => {
			this.shooter.lives -= 1;
			hudShooterLives.innerText = `x${this.shooter.lives}`;
		};

		this.endGame = (outcome) => {
			this.pauseAction();

			const elapsedTime = Date.now() - this.startTime;

			const elapsedMins = new Date(elapsedTime).getMinutes();
			const elapsedSecs = new Date(elapsedTime).getSeconds();
			const elapsedMs = new Date(elapsedTime).getMilliseconds();

			const minOutput = elapsedMins < 10 ? `0${elapsedMins}` : elapsedMins;
			const secOutput = elapsedSecs < 10 ? `0${elapsedSecs}` : elapsedSecs;
			const msOutput = elapsedMs < 100 ? `0${elapsedMs}` : elapsedMs;

			modal.style.display = "flex";
			modal.style.width = "auto";
			modalTime.innerText = `${minOutput}:${secOutput}:${msOutput}`;
			modalScore.innerText = `${this.playerScore}`;
			modalMsg.innerText = `YOU ${outcome}!!!`;
		};

		this.monitorEnemyHit = () => {
			const liveShooterLaserNodeList = document.querySelectorAll(".laser");

			liveShooterLaserNodeList.forEach((laser) => {
				const r1 = laser.getBoundingClientRect();

				for (let i = 0; i < this.enemyInstances.length; i++) {
					const r2 = this.enemyInstances[i].enemyDiv.getBoundingClientRect();

					if (!(r1.top > r2.bottom || r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top)) {
						this.updateScore();
						this.enemyInstances[i].enemyDiv.remove();
						this.enemyInstances[i].isDead = true;
						clearTimeout(this.enemyInstances[i].timeOut);
						this.enemyInstances.splice(i, 1);
						laser.remove();
						if (this.enemyInstances.length === 0) {
							this.endGame("WON");
						}
						break;
					}
				}
			});
		};

		this.monitorShooterHit = () => {
			const liveEnemyLaserArray = document.querySelectorAll(".enemy-laser");
			const r1 = this.shooter.shooter.getBoundingClientRect();

			for (let i = 0; i < liveEnemyLaserArray.length; i++) {
				const r2 = liveEnemyLaserArray[i].getBoundingClientRect();

				if (!(r1.top > r2.bottom || r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top)) {
					liveEnemyLaserArray[i].remove();
					if (this.shooter.lives > 1) {
						this.updateLives();
						this.shooter.showToolTip(-1);
						break;
					} else {
						this.shooter.canShoot = false;
						this.shooter.shooter.remove();
						this.endGame("LOST");
						break;
					}
				}
			}
		};

		this.init = () => {
			let msg = this.startGameMsgs.ready;
			modal.style.display = "flex";
			modal.style.width = "30vw";
			modalStatsBox.style.display = "none";
			modalActionBox.style.display = "none";
			modalMsg.innerText = msg;
			setTimeout(() => {
				msg = this.startGameMsgs.go;
				modalMsg.innerText = msg;
				setTimeout(() => {
					this.resetModal();
					this.shooter = new Shooter(shooterSettings);
					this.shooter.init();
					this.enemyBox = new EnemyBox(difficultySettings);
					this.enemyBox.init();
					this.moveCanvas();
					this.setPauseHandler();
					this.startGame();
					this.startTime = Date.now();
				}, 1000);
			}, 1000);
		};
	}
}

export default SpaceShooter;
