const GAME_SETTING_OPTIONS = {
	difficultySettings: {
		EASY: {
			difficulty: "easy",
			enemySpeed: 0.5,
			laserSpeed: 2000,
			enemyColumns: 8,
			enemyRows: 4,
			enemyLaserColor: "#5F9EA0",
			height: 42,
			width: 46.5,
			lives: 3,
		},
		MODERATE: {
			difficulty: "moderate",
			enemySpeed: 1,
			laserSpeed: 1500,
			enemyColumns: 10,
			enemyRows: 4,
			enemyLaserColor: "#FF8C00",
			height: 42,
			width: 46.5,
			width: 51.5,
			lives: 2,
		},
		HARD: {
			difficulty: "hard",
			enemySpeed: 1.5,
			laserSpeed: 1000,
			enemyColumns: 12,
			enemyRows: 5,
			enemyLaserColor: "#F0FFFF",
			height: 42,
			width: 46.5,
			lives: 1,
		},
	},
	shooterSettings: {
		RED: {
			laserSpeed: 2000,
			laserCoolDownPeriod: 1500,
			color: "red",
			speed: window.innerWidth / 300,
		},
		BLUE: {
			laserSpeed: 1500,
			laserCoolDownPeriod: 2000,
			color: "blue",
			speed: window.innerWidth / 450,
		},
		GREEN: {
			laserSpeed: 1000,
			laserCoolDownPeriod: 2500,
			color: "green",
			speed: window.innerWidth / 600,
		},
	},
};

export { GAME_SETTING_OPTIONS };
