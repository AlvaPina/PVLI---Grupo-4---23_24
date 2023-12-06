import { LoadScene } from "./escena.js";
import { MainScene } from "./mainScene.js";
import { SelectionMenu } from "./selectionMenu.js";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [LoadScene, MainScene, SelectionMenu], // Añade aquí la nueva escena
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
