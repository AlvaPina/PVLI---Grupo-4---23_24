import { LoadScene } from "./escena.js";
import { MainScene } from "./mainScene.js";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [LoadScene, MainScene], // Añade aquí la nueva escena
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // Gravedad
            debug: false
        }
    },
    backgroundColor: '#304858',
};

const game = new Phaser.Game(config);
