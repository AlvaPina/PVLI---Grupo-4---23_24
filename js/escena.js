export class LoadScene extends Phaser.Scene 
{
    constructor() {
        super({ key: 'LoadScene' });
        this.texts = ["Cargando", "Cargando.", "Cargando..", "Cargando..."];
        this.contador = 0;
        this.textNumber = 0;
        this.loadingText = null;
    }

    preload() {
        // Preload assets
        this.load.image('backgroundINI', 'Assets/WebPage/Img/LoadingScreen.png');

        this.load.image('background', 'Assets/Mapa/Img/CapaFondo.png');
        this.load.image('suelos', 'Assets/Mapa/Img/CapaSuelos.png');
        this.load.image('ground', 'Assets/WebPage/Img/groundInvisible.png');
        this.load.image('potion', 'Assets/Objetos/PocionLanzable.png');
        // Cargar los spritesheets
        this.load.spritesheet('logic_idle', 'Assets/Characters/Logic_Idle.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_jump', 'Assets/Characters/Logic_Jump.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_move', 'Assets/Characters/Logic_Walk.png', { frameWidth: 300, frameHeight: 300 });
        this.load.spritesheet('logic_attack', 'Assets/Characters/Logic_Attack.png', { frameWidth: 300, frameHeight: 300 });
        // ... cargar otros spritesheets ...
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
        //// ... Cargar assets de enemigos
        //this.load.spritesheet('enemyType1', 'assets/enemy1.png', { frameWidth: 64, frameHeight: 64 });
        //this.load.spritesheet('enemyType2', 'assets/enemy2.png', { frameWidth: 64, frameHeight: 64 });
    }
    create() {
        // Crear animaciones aquí
        this.createAnimations();
        // Agregar imagen de fondo
        let image = this.add.image(0, 0, "backgroundINI");
        image.setOrigin(0.5, 0.5);
        image.setPosition(this.game.config.width / 2, this.game.config.height / 2);
        image.setScale(0.785, 0.785);

        // Configurar texto de carga
        this.loadingText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "Cargando...", {
            fontFamily: "Arial",
            fontSize: "30px",
            color: "#ffffff"
        });
        this.loadingText.setPosition(780, 480);

        // Evento peri�dico para actualizar texto
        this.time.addEvent({
            delay: 500,                // intervalo de 500 ms

            callback: this.updateText, // funcion a ejecutar

            callbackScope: this,       // contexto (LoadScene)
            loop: true                 // repetir indefinidamente
        });

        // Cambiar a MainScene despu�s de un tiempo determinado
        this.time.delayedCall(3000, () => {
            this.scene.stop('LoadScene');
            this.scene.start('MainScene');
        });
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
        frameRate: 1,
        repeat: -1
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
        frameRate: 20,
        repeat: 0
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
        repeat: -1
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
        frameRate: 7,
        repeat: 0,
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
        repeat: -1
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
        frameRate: 7,
        repeat: 0
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
        repeat: -1
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
        frameRate: 7,
        repeat: 0
    });
    console.log("Se han creado las animaciones!");
}
//#endregion

    updateText() {
        if (this.loadingText) {
            this.loadingText.setText(this.texts[this.textNumber]);
            this.textNumber++;
            if (this.textNumber >= this.texts.length) {
                this.textNumber = 0;
            }
        }
    }

}  