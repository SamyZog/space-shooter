import {
	cooldownBar,
	cooldownMeter,
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
		this.gameEnded = false;
		this.startGameMsgs = {
			ready: "Get Ready!",
			go: "GO!",
		};
		this.playerScore = 0;
		this.enemyInstances = [];
		this.shooterSettings = shooterSettings;
		this.difficultySettings = difficultySettings;
		this.paused = false;

		// initiate game
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
					this.moveCanvas();
					this.shooter = new Shooter(shooterSettings);
					this.shooter.init();
					this.enemyBox = new EnemyBox(difficultySettings);
					this.enemyBox.init();
					this.setPauseHandler();
					this.startGame();
					cooldownMeter.style.display = "block";
					hudScore.innerText = 0;
					this.startTime = Date.now();
				}, 1000);
			}, 1000);
		};

		this.resetModal = () => {
			modal.style.display = "none";
			modal.style.width = "auto";
			modalStatsBox.style.display = "grid";
			modalActionBox.style.display = "flex";
			modalMsg.innerText = "";
		};

		// simulate moving space
		this.moveCanvas = () => {
			space.animate([{ backgroundPositionY: 0 }, { backgroundPositionY: "256px" }], {
				duration: 1000,
				iterations: Infinity,
			});
		};

		// setup listener to handle game pausing
		this.setPauseHandler = () => {
			document.addEventListener("keyup", this.handlePause);
		};

		// start the game by calling the game loop
		this.startGame = () => {
			requestAnimationFrame(this.gameLoop);
		};

		// live loop that controls the game
		this.gameLoop = () => {
			if (this.paused) {
				return;
			}
			this.shooter.actions();
			this.enemyBox.actions();
			this.monitorEnemyHit();
			this.monitorShooterHit();
			this.decrementCoolDownBarHeightLevel();
			requestAnimationFrame(this.gameLoop);
		};

		this.decrementCoolDownBarHeightLevel = () => {
			if (!this.shooter.canShoot) {
				return;
			}
			if (this.shooter.coolDownBarHeightLevel < 0) {
				this.shooter.coolDownBarHeightLevel = 0;
				return;
			}
			cooldownBar.style.top = `-${(this.shooter.coolDownBarHeightLevel -= this.shooter.decrementLevel)}%`;
		};

		this.handlePause = (e) => {
			if (this.gameEnded) {
				return;
			}
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

		// when game is paused
		this.pauseAction = () => {
			this.paused = true;
			// stop animations
			document.getAnimations().forEach((animation) => animation.pause());
			this.shooter.canShoot = false;
			this.enemyInstances.forEach((instance) => {
				instance.canShoot = false;
				clearTimeout(instance.timeOut);
			});
			modalStatsBox.style.display = "none";
			modalActionBox.style.display = "none";
			modal.style.display = "flex";
			modal.style.width = "30vw";
			modalMsg.innerText = "PAUSED!";
		};

		// when game is resumed
		this.unPauseAction = () => {
			this.paused = false;
			// hide modal
			this.resetModal();
			// resume animations
			document.getAnimations().forEach((animation) => animation.play());
			this.shooter.canShoot = true;
			// restart the game engine
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
			this.resetModal();
			const elapsedTime = Date.now() - this.startTime;
			const elapsedMins = new Date(elapsedTime).getMinutes();
			const elapsedSecs = new Date(elapsedTime).getSeconds();
			const elapsedMs = new Date(elapsedTime).getMilliseconds();

			const minOutput = elapsedMins < 10 ? `0${elapsedMins}` : elapsedMins;
			const secOutput = elapsedSecs < 10 ? `0${elapsedSecs}` : elapsedSecs;
			const msOutput = elapsedMs < 100 ? `0${elapsedMs}` : elapsedMs;

			modal.style.display = "flex";
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
						if (this.enemyInstances.length === 0) {
							this.endGame("WON");
							this.gameEnded = true;
							break;
						}
						this.updateScore();
						this.enemyInstances[i].enemyDiv.remove();
						this.enemyInstances[i].isDead = true;
						this.enemyInstances.splice(i, 1);
						laser.remove();
						break;
					}
				}
			});
		};

		this.monitorShooterHit = () => {
			const liveEnemyLaserNodeList = document.querySelectorAll(".enemy-laser");
			const r1 = this.shooter.shooter.getBoundingClientRect();

			for (let i = 0; i < liveEnemyLaserNodeList.length; i++) {
				const r2 = liveEnemyLaserNodeList[i].getBoundingClientRect();

				if (!(r1.top > r2.bottom || r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top)) {
					liveEnemyLaserNodeList[i].remove();
					this.updateLives();
					this.shooter.showToolTip(-1);
					if (this.shooter.lives < 1) {
						this.endGame("LOST");
						this.gameEnded = true;
						this.shooter.shooter.remove();
						break;
					}
					break;
				}
			}
		};
	}
}

export default SpaceShooter;
