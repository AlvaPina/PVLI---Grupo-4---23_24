import Player from './Characters/player.js';
import Enemy from './Characters/enemy.js';

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        //this.enemy = null;
        this.enemies = []; //Array vacio de enemigos
        this.cursors = null;
    }

    preload() {
        this.load.image('background', 'Assets/WebPage/Img/background.png'); 
        this.load.image('ground', 'Assets/WebPage/Img/ground.png');
        this.load.image('potion', 'Assets/Objetos/PocionLanzable.png' );
        //SpriteSheets de Lógica
        this.load.spritesheet('logic_idle', 'Assets/Characters/Logic_Idle.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_jump', 'Assets/Characters/Logic_Jump.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_move', 'Assets/Characters/Logic_Walk.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_attack', 'Assets/Characters/Logic_Attack.png',{frameWidth: 300 , frameHeight: 300 });
        //SpriteSheets de Protagonista
        this.load.spritesheet('protagonist_idle', 'Assets/Characters/Protagonist_Idle.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('protagonist_jump', 'Assets/Characters/Protagonist_Jump.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('protagonist_move', 'Assets/Characters/Protagonist_Walk.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('protagonist_attack', 'Assets/Characters/Protagonist_Attack.png', { frameWidth: 300, frameHeight: 300 });
        //SpriteSheets de Defensor
        this.load.spritesheet('defender_idle', 'Assets/Characters/Defender_Idle.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('defender_jump', 'Assets/Characters/Defender_Jump.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('defender_move', 'Assets/Characters/Defender_Walk.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('defender_attack', 'Assets/Characters/Defender_Attack.png', { frameWidth: 300, frameHeight: 300 });
        //SpriteSheets de Virtuoso
        this.load.spritesheet('virtuous_idle', 'Assets/Characters/Virtuous_Idle.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('virtuous_jump', 'Assets/Characters/Virtuous_Jump.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('virtuous_move', 'Assets/Characters/Virtuous_Walk.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('virtuous_attack', 'Assets/Characters/Virtuous_Attack.png', { frameWidth: 300, frameHeight: 300 });
    }

    create() {
        //Creamos animaciones de los personajes
        this.createAnimations();
        this.add.image(400, 300, 'background'); // Ajusta las coordenadas seg�n necesites

        // Configurar la gravedad
        this.physics.world.gravity.y = 300;

        //Creamos el suelo
        let ground = this.physics.add.staticGroup();
        //refreshBody() -> Para detectar colisiones con el player
        ground.create(400, 600, 'ground').setScale().refreshBody();

        //crear player
        this.player = new Player(this, 100, 250, 160, 10, null, 'l');
        //Empieza animacion
        this.player.startAnimation();
        //Seteamos escala
        this.player.setScale(0.5 , 0.5);
        //Añadimos las colisiones entre el player y el suelo
        this.physics.add.collider(this.player,ground);
        
        //Creamos enemigos
        var numEnemies = 3;
        var posX= 300; 
        for(let i = 0; i < numEnemies; i++){
            var enemy = new Enemy(this , posX, 450, 50, 50);
            this.enemies.push(enemy); //Agregamos enemigo al array
            this.physics.add.collider(this.enemies[i], ground);
            this.physics.add.collider(this.player, this.enemies[i], this.handleCollision, null, this);
            posX += 200;
        }
        //Booleano para determinar primer acceso al menu de seleccion
        this.firstChange= true;
    }
//#region Creacion de animaciones para los personajes
    createAnimations() {
        // Crear animaciones globales
        //--ANIMACIONES PARA LOGICA--
        this.anims.create({
            key: 'l_idle',
            frames: this.anims.generateFrameNumbers('logic_idle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'l_jump',
            frames: this.anims.generateFrameNumbers('logic_jump', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'l_move',
            frames: this.anims.generateFrameNumbers('logic_move', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'l_attack',
            frames: this.anims.generateFrameNumbers('logic_attack', { start: 0, end: 4 }),
            frameRate: 15,
            repeat: -1
        });
        //--ANIMACIONES PARA PROTAGONISTA--
        this.anims.create({
            key: 'p_idle',
            frames: this.anims.generateFrameNumbers('protagonist_idle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'p_jump',
            frames: this.anims.generateFrameNumbers('protagonist_jump', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'p_move',
            frames: this.anims.generateFrameNumbers('protagonist_move', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'p_attack',
            frames: this.anims.generateFrameNumbers('protagonist_attack', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        //--ANIMACIONES PARA DEFENSOR--
        this.anims.create({
            key: 'd_idle',
            frames: this.anims.generateFrameNumbers('defender_idle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'd_jump',
            frames: this.anims.generateFrameNumbers('defender_jump', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'd_move',
            frames: this.anims.generateFrameNumbers('defender_move', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'd_attack',
            frames: this.anims.generateFrameNumbers('defender_attack', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        //--ANIMACIONES PARA VIRTUOSO--
        this.anims.create({
            key: 'v_idle',
            frames: this.anims.generateFrameNumbers('virtuous_idle', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'v_jump',
            frames: this.anims.generateFrameNumbers('virtuous_jump', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'v_move',
            frames: this.anims.generateFrameNumbers('virtuous_move', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'v_attack',
            frames: this.anims.generateFrameNumbers('virtuous_attack', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    }
//#endregion
    handleCollision(player, enemy){
        this.player.recieveDamage(4);
        enemy.destroy();
    }
    //Metodo para cambiar al menu de seleccion (llamado a traves del input del jugador)
    changeToSelection(){
        this.scene.pause();
        if(this.firstChange){
            this.scene.launch('SelectionMenu');
            console.log("Has accedido por primera vez al menu de seleccion!");
            this.firstChange = false; 
        }
        else {
            this.scene.resume('SelectionMenu');
        }
        console.log("Estas en el menú de cambio de personaje...");
    }
    
    update() {
    
    }
}
