import { MenuInicial } from "./Menu.js";
import { LoadScene } from "./PantallaCarga.js";
import { SelectionMenu } from "./SelectionMenu.js";
import { GameOver } from "./GameOver.js";
import { MainScene } from "./mainScene.js";
import { Nivel2 } from "./Nivel2.js";
import { Nivel3 } from "./Nivel3.js";
import { Nivel4 } from "./Nivel4.js";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 960,
    height: 540,
    scene: [MenuInicial , LoadScene, MainScene, Nivel2, Nivel3, Nivel4, SelectionMenu, GameOver], // Añade aquí la nueva escena
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // Gravedad
            debug: true
        }
    },
    //backgroundColor: '#304858',
};

const game = new Phaser.Game(config);
