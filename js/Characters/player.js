import Turret from '../Objetos/Turret.js';
import UI from '../UI.js';
import Proyectil     from '../Objetos/Proyectil.js';
import SerVivo from './serVivo.js';

export default class Player extends SerVivo {
    constructor(scene, x, y, speed, iniLives, spriteId) {
        super(scene, x, y, null, iniLives);
        //Instanciamos personaje en escena
        scene.add.existing(this);
        //Añadimos físicas
        scene.physics.add.existing(this);

        // Ajustar el tamaño y la posición del collider para que se centre en el jugador
        const colliderWidth = 300;
        const colliderHeight = 300;
        this.setOrigin(0.5);
        // Ajustar el collider del jugador
        this.body.setSize(colliderWidth - 170, colliderHeight - 10);
        //Establecer el desplazamiento del collider para centrarlo
        this.body.setOffset((300 - (colliderWidth - 170)) / 2, (300 - (colliderHeight - 10)) / 2);
        
        //this.body.setOffset(0, 0);
        
        // Configuración de la física del jugador
        this.setCollideWorldBounds(true);

		// Configurar entradas del teclado
		this.cursors = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            control: Phaser.Input.Keyboard.KeyCodes.CTRL
        });

        //Booleano que controla el ataque
        this.isAttack = false;

        // Eventos de raton para realizar ataque 
        this.scene.input.on('pointerdown', (pointer) => {
            //Solo si el jugador esta en el suelo y se pulsa click izquerdo, se realiza el ataque
            if (pointer.leftButtonDown()) {
                this.isAttack = true; // Activar el ataque
                this.attack();
            }
        });
        //Parametros del player
        this.dir = 1;
        this.spriteId = spriteId;
        this.speed = speed;
        this.scene = scene;
        this.potionSpeed = 10;

        //Stats de daño dependiendo a los enemigos de las diferentes personalidades
        this.logicDamage = 5;
        this.defenderDamage = 7;
        this.protagonistDamage = 8;
        this.virtuousDamage = 6;

        //Creamos la instancia de la UI
        this.ui = new UI(this.scene, this);
    }
    //Metodo para confirmar el cambio
    confirmChange(id){
        //Si el id es 'x', no se hace nada y se deja el id igual
        if(id === 'x') return 
        //Sino, actualizamos el sprite id tras la seleccion en el selection menu
        else this.spriteId = id;
    }
    //Metodo para empezar la animacion inicial
    startAnimation() {
        //Reproducimos la animacion de idle
        this.play(this.spriteId + '_idle');
    }
    //PreUpdate
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        //detectamos input
        this.playerInput();
        //Controlamos animaciones
        this.animationManager();
        //Controlamos cambio de personaje, si el jugador, pulsa control, cambiamos de escena
        if(this.changePersonality()) this.scene.changeToSelection(this.SpriteId);
        //Actualizamos UI
        this.ui.updateUI();
        //Si nos preciciptamos al vacio... morimos
        if(this.y > 510) {
            //Vamos a la pantalla de GameOver
            this.scene.GameOver();
        }
        
    }

    //Input del Jugador
    playerInput() { 
        //El jugador salta si se pulsa la tecla, toca el suelo
        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.body.touching.down) {
            this.setVelocityY(this.speed * -1);
        } 
        //Moverse a la izquierda
        if (this.cursors.left.isDown) {
            this.dir = -1; 
            this.setVelocityX(this.speed * this.dir);
			this.setFlip(true, false);
        }
        //Moverse a la derecha
        else if (this.cursors.right.isDown) {
            this.dir = 1;
            this.setVelocityX(this.speed * this.dir);
            this.setFlip(false, false);
        }
        //Si no hay input, nos quedamos quietos
        else {
            this.setVelocityX(0);
        }
    }
    
    attack() {
        //Mientras se realiza el ataque, el jugador no se podra mover
        //this.setVelocityX(0);
        //Dependiendo del spriteId seleccionado, se hace un ataque u otro
        switch(this.spriteId)
        {
            //Ataque de Logica
            case 'l':
                this.logicAttack();
            break;
            //Ataque de Protagonista
            case 'p':
                this.protagonistAttack();
            break;
            //Ataque de Defensor
            case 'd':
                this.defenderAttack();
            break;
            //Ataque de Virtuoso
            case 'v':
                this.virtuousAttack();
            break;
        }
    }
    
//#region Ataques de las distintas personalidades
    //Ataque de logica (pocion lanzable)
    logicAttack() {
        // Obtener el vector de velocidad actual del jugador
        let velocityVector = new Phaser.Math.Vector2(this.body.velocity.x, this.body.velocity.y);

        // Si el jugador está quieto, usar la dirección actual para el disparo
        if (velocityVector.length() === 0) {
            velocityVector = new Phaser.Math.Vector2(this.dir, 0);
        }

        // Crear el proyectil con la velocidad actual del jugador (esto permite disparar en diagonal)
        new Proyectil(this.scene, this.x, this.y, 'potion', this.dir, this.logicDamage, this.potionSpeed, true);
    }
    //Ataque de protagonista (espadazo)
    protagonistAttack(){
        //El ataque consiste en un rectangulo invisible que representa el área de ataque de la espada
        //Diemnsiones
        const rectWidth = 80 , rectHeight = 80; 
        //Area de ataque
        const swordAttackArea = this.scene.add.rectangle(this.x + 80, this.y, rectWidth, rectHeight, 0x000FF);
        //Añadimos fisicas y hacemos que no tenga gravedad
        this.scene.physics.add.existing(swordAttackArea);
        swordAttackArea.body.setAllowGravity(false);
        //lo desactivamos y lo dejamos invisible en un principio
        swordAttackArea.setActive(false);
        swordAttackArea.setVisible(false);
        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anims, frame) {
            //if(this.anims.currentFrame === 3 || this.anims.currentFrame === 4){
                swordAttackArea.setActive(true);
                //swordAttackArea.setVisible(true);
                //Hacemos evento overlap para controlar el numero de daño que le hace y evitar que haga mas daño de la cuenta
                this.scene.physics.add.overlap(swordAttackArea, this.scene.getEnemies(), function (sword, enemy) {
                    //Si el area de ataque esta activa
                    if (sword.active) {
                        //Hacemos daño al enemigo enviando la cantidad de daño infligida por el protagonista
                        enemy.enemyRecieveDamage(this.protagonistAttack);
                        // Desactivamos el área de ataque después de dañar a un enemigo
                        sword.setActive(false); 
                    }
                });
            //}
             // Destruir swordAttackArea después de un tiempo para que le de tiempo a detectar la colision
             this.scene.time.delayedCall(100, () => {
                swordAttackArea.destroy();
            });
        });
    }
    //Ataque de defensor (puñetazo)
    defenderAttack(){
        //El ataque consiste en un rectangulo invisible que representa el área de ataque del puño
        //Dimensiones
        const rectWidth = 80 , rectHeight = 80; 
        //Area de ataque
        const fistAttackArea = this.scene.add.rectangle(this.x + 80, this.y, rectWidth, rectHeight, 0x000FF);
        //Añadimos fisicas y hacemos que no tenga gravedad
        this.scene.physics.add.existing(fistAttackArea);
        fistAttackArea.body.setAllowGravity(false);
        //lo desactivamos y lo dejamos invisible en un principio
        fistAttackArea.setActive(false);
        fistAttackArea.setVisible(false);
        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anims, frame) {
            //if(this.anims.currentFrame === 3 || this.anims.currentFrame === 4){
                fistAttackArea.setActive(true);
                //swordAttackArea.setVisible(true);
                this.scene.physics.add.overlap(fistAttackArea, this.scene.getEnemies(), function (fist, enemy) {
                    //Si el area de ataque esta activa
                    if (fist.active) {
                        //Hacemos daño al enemigo enviando la cantidad de daño infligida por defensor
                        enemy.enemyRecieveDamage(this.defenderAttack);
                        // Desactivamos el área de ataque después de dañar a un enemigo
                        fist.setActive(false); 
                    }
                });
            //}
             // Destruir swordAttackArea después de un tiempo para que le de tiempo a detectar la colision
             this.scene.time.delayedCall(100, () => {
                fistAttackArea.destroy();
            });
        });

    }
    //Ataque del vitruoso (instanciar torreta)
    virtuousAttack(){
        //Controlamos las instancias de las torretas (recordemos que solo puede haber una)
        // Si ya hay una torreta existente, la destruimos antes de crear una nueva
        if (this.scene.oneTurret) {
            this.scene.oneTurret.setActive(false, this.dir);
        }
        // Sino, instanciamos una nueva torreta (añadimos un poco de distancia entre la instancia y el jugador) y la igualamos
        // a la nueva torreta
        this.scene.oneTurret.setActive(true , this.dir);
    }

    //Metodo para controlar que animaciones debe hacer el personaje en cada momento del juego
    animationManager() {
        // Verificar si currentAnim es null antes de acceder a su propiedad key
        const currentAnimKey = this.anims.currentAnim ? this.anims.currentAnim.key : null;
        // Si está en el aire
        if (!this.body.onFloor()) {
            if (currentAnimKey !== this.spriteId + '_jump') {
                this.play(this.spriteId + '_jump');
            }
        }
        //Si se mueve en cualquier direccion en el suelo
        else if(this.body.velocity.x != 0){ 
            if(currentAnimKey !== this.spriteId + '_move'){ this.play(this.spriteId + '_move'); }
        }
        //Si esta atacando
        else if(this.isAttack){ 
            if(currentAnimKey !== this.spriteId + '_attack'){
                //Reproducimos animacion de atatque
                this.play(this.spriteId + '_attack');
                //Cuando se finaliza la animacion de ataque, se ejecuta lo que hay dentro
                this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                    //console.log('La animación ha terminado:', this.anims.currentAnim.key);
                    //Ponemos booleano de ataque a false
                    this.isAttack = false;
                });
            }
        }
        //Si esta quieto
        else {
            if(currentAnimKey !== this.spriteId + '_idle'){ this.play(this.spriteId + '_idle'); }
        }
    }

    //Metodo booleano para comprobar si el jugador ha pulsado la tecla control para acceder al menu de seleccion
    changePersonality(){
        if(this.cursors.control.isDown){
            //console.log(this.spriteId);
            return true;
        }
        return false;
    }
}
