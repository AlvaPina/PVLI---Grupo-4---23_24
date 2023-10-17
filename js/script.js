import {LoadScene} from "./escena.js";

// Scripts de JavaScript aqu�
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: LoadScene,
    backgroundColor: '#304858',
};

const game = new Phaser.Game(config);
