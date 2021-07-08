import { spaceRight } from "./elements";

const GAME_SETTING_OPTIONS = {
	difficultySettings: {
		EASY: {
			difficulty: "easy",
			enemySpeed: 1,
			laserSpeed: 3000,
			enemyColumns: 6,
			enemyRows: 4,
			enemyLaserColor: "#5F9EA0",
			height: 42,
			width: 46.5,
		},
		MODERATE: {
			difficulty: "moderate",
			enemySpeed: 2,
			laserSpeed: 2500,
			enemyColumns: 8,
			enemyRows: 5,
			enemyLaserColor: "#FF8C00",
			height: 42,
			width: 46.5,
			width: 51.5,
		},
		HARD: {
			difficulty: "hard",
			enemySpeed: 3,
			laserSpeed: 2000,
			enemyColumns: 10,
			enemyRows: 6,
			enemyLaserColor: "#F0FFFF",
			height: 42,
			width: 46.5,
		},
	},
	shooterSettings: {
		RED: {
			laserSpeed: 2000,
			laserCoolDownPeriod: 1500,
			color: "red",
			speed: spaceRight / 300,
		},
		BLUE: {
			laserSpeed: 1500,
			laserCoolDownPeriod: 2000,
			color: "blue",
			speed: spaceRight / 500,
		},
		GREEN: {
			laserSpeed: 1000,
			laserCoolDownPeriod: 2500,
			color: "green",
			speed: spaceRight / 700,
		},
	},
};

export { GAME_SETTING_OPTIONS };
