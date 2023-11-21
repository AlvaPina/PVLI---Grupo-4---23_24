import Player from './Characters/player.js';
import Enemy from './Characters/enemy.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.enemy = null;
        this.cursors = null;
    }

    preload() {
        this.load.image('background', 'Assets/WebPage/Img/background.png'); 
        this.load.image('ground', 'Assets/WebPage/Img/ground.png');
        this.load.image('potion', 'Assets/Objetos/PocionLanzable.png' );
        this.load.spritesheet('logic_idle', 'Assets/Characters/Logic_Idle.png', { frameWidth: 300, frameHeight: 300 });
        //this.load.spritesheet('logic_jump', 'Assets/Characters/Logic_Jump.png', { frameWidth: 96, frameHeight: 100 });
        this.load.spritesheet('logic_move', 'Assets/Characters/Logic_Walk.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_attack', 'Assets/Characters/Logic_Attack.png',{frameWidth: 300 , frameHeight: 300 });
    }

    create() {
        this.add.image(400, 300, 'background'); // Ajusta las coordenadas seg�n necesites

        // Configurar la gravedad
        this.physics.world.gravity.y = 300;

        //Creamos el suelo
        let ground = this.physics.add.staticGroup();
        //refreshBody() -> Para detectar colisiones con el player
        ground.create(400, 600, 'ground').setScale().refreshBody();

        //crear player
        this.player = new Player(this, 100, 250, 160, 10);
        //Empieza animacion
        this.player.startAnimation();
        //Seteamos escala
        this.player.setScale(0.5, 0.5);
        //Añadimos las colisiones entre el player y el suelo
        this.physics.add.collider(this.player,ground);

        this.enemy= new Enemy(this, 300, 450, 200, 200);
        this.enemy.setScale(0.5, 0.5);
        this.physics.add.collider(this.enemy , ground);

        this.physics.add.collider(this.player, this.enemy, this.handleCollision, null, this);
    }
    handleCollision(){
        this.player.recieveDamage(3);
        this.enemy.destroy();
    }
    update() {
    
    }
}
