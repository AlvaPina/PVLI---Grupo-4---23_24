import { LoadScene } from "./escena.js";
import { MainScene } from "./mainScene.js";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 960,
    height: 540,
    scene: [LoadScene, MainScene], // Añade aquí la nueva escena
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // Gravedad
            debug: true
        }
    },
    backgroundColor: '#304858',
};

const game = new Phaser.Game(config);
