import Player from './Characters/player.js';
import RedBull from './Objetos/RedBull.js';
import Puton from './Characters/Enemy/puton.js';
import Problemas from './Characters/Enemy/problemas.js';
import Turret from './Objetos/Turret.js';
import Sombra from './Characters/Enemy/sombra.js';
export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.player = null;
        this.oneTurret = null;
        this.cursors = null;
        this.groundLayer = null;
    }

    preload() {
    }
   
    create() {
        // Dimensiones y configuración del juego
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        // Configuración del fondo y otros elementos de la escena
        let background = this.add.image(gameWidth / 2, gameHeight / 2, 'background1').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        // Configuración del mapa y las capas de colisiones
        var mapa = this.make.tilemap({ key: 'mapa' });
        var capaColisiones = mapa.getObjectLayer('Capa de Objetos 1');

        // Creación del suelo
        this.groundLayer = this.physics.add.staticGroup();
        capaColisiones.objects.forEach(objeto => {
            var colisionObject = this.add.rectangle(objeto.x / 2, objeto.y / 2, objeto.width / 2, objeto.height / 2).setOrigin(0, 0);
            this.physics.world.enable(colisionObject);
            colisionObject.body.setCollideWorldBounds(true);
            this.groundLayer.create(colisionObject.x, colisionObject.y, 'ground').setOrigin(0, 0).setDisplaySize(colisionObject.width, colisionObject.height).refreshBody();
            colisionObject.destroy();
        });

        // Configuración de la gravedad
        this.physics.world.gravity.y = 700;

        // Creacicón de los dos grupos
        this.enemiesGroup = this.physics.add.group();
        this.alliesGroup = this.physics.add.group();

        // Creación y configuración del jugador
        this.player = new Player(this, 100, 250, 10, 'l');
        this.player.startAnimation();
        this.physics.add.collider(this.player, this.groundLayer); // Colisión entre el jugador y el suelo
        this.alliesGroup.add(this.player);

        // Creacion Torreta
        this.oneTurret = new Turret(this, 'turret', this.player.virtuousDamage);
        this.alliesGroup.add(this.oneTurret);

        // Configuración de la cámara
        let camera = this.cameras.main;
        camera.setBounds(0, 0, gameWidth, gameHeight);
        camera.startFollow(this.player);
        camera.setZoom(1.4);

        // Creación del punto de cambio de escena
        this.changeScenePoint = this.add.rectangle(920, 275, 50, 50, 0x0000ff, 0); // x, y, width, height son los parámetros de la posición y tamaño
        this.physics.add.existing(this.changeScenePoint, true); // 'true' hace que sea estático

        // Configuración de la colisión entre el jugador y el punto de cambio
        this.physics.add.overlap(this.player, this.changeScenePoint, this.onOverlapChangeScene, null, this);

        //Metodo asociado al resume de esta escena, con los parametros scene y el id actual del jugador
         this.events.on('resume', (scene , id) =>{
            //Llama al metodo de confirmar cambios ubicado en el player
            this.player.confirmChange(id);
        });

        //Añadir Enemigos
        this.enemigo1 = new Puton(this, 500, 200);
        this.physics.add.collider(this.enemigo1, this.groundLayer);
        this.enemiesGroup.add(this.enemigo1);

        this.enemigo2 = new Sombra(this, 300, 250);
        this.physics.add.collider(this.enemigo2, this.groundLayer);
        this.enemiesGroup.add(this.enemigo2);

        this.enemigo3 = new Sombra(this, 700, 200);
        this.physics.add.collider(this.enemigo3, this.groundLayer);
        this.enemiesGroup.add(this.enemigo3);

        //Añadir lata
        this.lata = new RedBull(this, 700, 260);
        this.physics.add.collider(this.lata, this.groundLayer);
        this.lata = new RedBull(this, 800, 370);
        this.physics.add.collider(this.lata, this.groundLayer); 

        //creacion musica
        this.cancion = this.sound.add('musicaFondo', { loop: true }).setVolume(0.25);
        if(this.cancion){
            this.cancion.play();
            this.cancion = null;
        }

        
        //// Crear puntos de patrulla
        //const patrolPoints = [
        //    { x: 100, y: 300 },
        //    { x: 400, y: 300 }
        //];

        //// Crear y añadir el enemigo Problemas a la escena
        //this.problemas = new Problemas(this, 100, 300, patrolPoints);
        //this.problemas.setScale(0.15, 0.15);
        //this.physics.add.collider(this.problemas, this.groundLayer);
    }

    // Método llamado cuando el jugador colisiona con el punto de cambio
    onOverlapChangeScene(player, changeScenePoint) {
        this.scene.start('Nivel2', {player: this.player}); // Cambia a la nueva escena
    }
    //Metodo para cambiar al menu de seleccion (llamado a traves del input del jugador)
    changeToSelection(){
        //Pausamos el menu de juego...
        this.scene.pause();
        //Vamos al menu de seleccion
        this.scene.launch('SelectionMenu', {scene: this});
        console.log("Estas en el menú de cambio de personaje...");
    }
    //Metodo para ir al menu de GameOver
    GameOver(){
        this.player.lifeComp.Die();
        this.scene.stop('MainScene');
        this.scene.start('GameOver');
        console.log("Has muerto D:");
    }
    //Getter de todos los enemigos del nivel
    getEnemies(){
        return this.enemies;
    }
    update() {
    
    }

    desactivarTorreta(){
        this.oneTurret.setActive(false, null);
    }
}
