import Player from './Characters/player.js';
import RedBull from './Objetos/RedBull.js';
import Puton from './Characters/Enemy/puton.js';
import Problemas from './Characters/Enemy/problemas.js';
import Turret from './Objetos/Turret.js';
import EnemySpawn from './Objetos/EnemySpawn.js';
import Sombra from './Characters/Enemy/sombra.js';
export class Nivel4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Nivel4' });
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

        // Creacicón de los dos grupos
        this.enemiesGroup = this.physics.add.group();
        this.alliesGroup = this.physics.add.group();
        this.enemySpawns = this.add.group();

        // Configuración del fondo y otros elementos de la escena
        let background = this.add.image(gameWidth / 2, gameHeight / 2, 'background4').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
        this.light = this.add.image(gameWidth / 2, gameHeight / 2, 'light').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        // Configuración del mapa y las capas de colisiones
        var mapa = this.make.tilemap({ key: 'mapa4' });
        var capaColisiones = mapa.getObjectLayer('Capa de Objetos 1');
        var capaSpawnEnemigos = mapa.getObjectLayer('Spawns Enemigos');

        // Creación del suelo
        this.groundLayer = this.physics.add.staticGroup();
        capaColisiones.objects.forEach(objeto => {
            var colisionObject = this.add.rectangle(objeto.x / 2, objeto.y / 2, objeto.width / 2, objeto.height / 2).setOrigin(0, 0);
            this.physics.world.enable(colisionObject);
            colisionObject.body.setCollideWorldBounds(true);
            this.groundLayer.create(colisionObject.x, colisionObject.y, 'ground').setOrigin(0, 0).setDisplaySize(colisionObject.width, colisionObject.height).refreshBody();
            colisionObject.destroy();
        });
        // Creación Spawns
        const offset = 50;
        capaSpawnEnemigos.objects.forEach(objeto => {
            var spawnObject = new EnemySpawn(this, objeto.x/2 + offset, objeto.y/2 + offset); //CAMBIAR LA POS QUE ESTA SIN TRASFORMAR
            this.enemySpawns.add(spawnObject);
        });


        // Configuración de la gravedad
        this.physics.world.gravity.y = 500;

        // Creación y configuración del jugador
        this.player = new Player(this, 100, 250, 10, 'l');
        this.player.startAnimation();
        this.player.setScale(0.18, 0.18);
        this.physics.add.collider(this.player, this.groundLayer); // Colisión entre el jugador y el suelo
        this.alliesGroup.add(this.player);

        // Creacion Torreta
        this.oneTurret = new Turret(this, 'turret', this.player.virtuousDamage);
        this.alliesGroup.add(this.oneTurret);
        this.physics.add.collider(this.player, this.groundLayer);

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
        return this.enemiesGroup;
    }

    update(time, delta) {
        this.enemySpawns.children.iterate(function(child) {
            child.preUpdate(time, delta);
        });
        const smoothStepFactor = 0.1;
        this.light.x += (this.player.x - this.light.x) * smoothStepFactor;
    }

    spawnEnemy(type, x, y){
        let enemigo;

        switch (type) {
            case 1:
                enemigo = new Puton(this, x, y);
                break;
            case 2:
                enemigo = new Sombra(this, x, y);
                break;
            case 3:
                enemigo = new Puton(this, x, y); //cambiar enemigo cuando esté
                break;
            case 4:
                enemigo = new Sombra(this, x, y); //cambiar enemigo cuando esté
                break;
            default:
                console.error("Tipo de enemigo no válido:", type);
                return null;
        }
        this.physics.add.collider(enemigo, this.groundLayer);
        this.enemiesGroup.add(enemigo);
    }

    desactivarTorreta(){
        this.oneTurret.setActive(false, null);
    }
}
