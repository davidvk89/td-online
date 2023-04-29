import Phaser from 'phaser'

import BootScene from './scenes/BootScene'
import CharacterSelectScene from './scenes/CharacterSelectScene'
import CharacterCreateScene from './scenes/CharacterCreateScene'
import GameScene from './scenes/GameScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 640,
	height: 360,
	dom:{
		createContainer: true
	},

	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [BootScene, CharacterSelectScene, CharacterCreateScene, GameScene]
}

export default new Phaser.Game(config)

