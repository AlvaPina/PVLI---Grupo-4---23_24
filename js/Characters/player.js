import Proyectile from '../Objetos/PocionLanzable.js';
import LifeComponent from '../LifeComponent.js';
import Turret from '../Objetos/Turret.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, speed, iniLives, lifeComp, spriteId) {
        super(scene, x, y, speed, iniLives, lifeComp, spriteId);
        //Instanciamos personaje en escena
        scene.add.existing(this);
        //Añadimos físicas
        scene.physics.add.existing(this);

        // Obtener el tamaño del frame del spritesheet
        //const spriteWidth = 300;
        //const spriteHeight = 300;

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
            if (pointer.leftButtonDown() && this.body.touching.down) {
                this.isAttack = true; // Activar el ataque
                this.attack();
            }
        });
        //creamos componente de vida
        this.lifeComp = new LifeComponent(iniLives, this);
        //Id del sprite de personalidad
        this.spriteId = spriteId;
        //Velocidad del jugador
        this.speed = speed;
        //escena
        this.scene = scene;
        //Direccion del jugador (1 -> derecha / -1 -> izquierda)
        this.dir = 1;
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
    }

    //Input del Jugador
    playerInput() { 
        //El jugador salta si se pulsa la tecla, toca el suelo, y si no está atacando
        if (this.cursors.space.isDown && this.body.touching.down && !this.isAttack) {
            this.setVelocityY(this.speed * -1);
            console.log("Salto");
        } 
        //Moverse a la izquierda
        if (this.cursors.left.isDown && !this.isAttack) { 
            this.dir = -1;
            console.log(this.dir);
            this.setVelocityX(this.speed * this.dir);
			this.setFlip(true, false);
            console.log("Izquierda");
        }
        //Moverse a la derecha
        else if (this.cursors.right.isDown && !this.isAttack) {
            this.dir = 1;
            console.log(this.dir);
            this.setVelocityX(this.speed * this.dir);
            this.setFlip(false, false);
            console.log("Derecha");
        }
        //Si no hay input, nos quedamos quietos
        else {
            this.setVelocityX(0);
        }
    }

    attack() {
        //Mientras se realiza el ataque, el jugador no se podra mover
        this.setVelocityX(0);
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
    logicAttack(){
       // Obtener el vector de velocidad actual del jugador
       let velocityVector = new Phaser.Math.Vector2(this.body.velocity.x, this.body.velocity.y);

       // Normalizar el vector si el jugador está quieto (para que el proyectil no se quede estático)
       if (velocityVector.length() === 0) {
           velocityVector = new Phaser.Math.Vector2(this.dir, 0);
           console.log(velocityVector);
       }

       new Proyectile(this.scene, this.x, this.y, 'potion', this.dir);
       console.log("Ataque activado");
    }
    //Ataque de protagonista (espadazo)
    protagonistAttack(){
        //El ataque consiste en un rectangulo invisible que representa el área de ataque de la espada
        //Diemnsiones
        const rectWidth = 80 , rectHeight = 80; 
        //Area de ataque
        const swordAttackArea = this.scene.add.rectangle(this.x + 73, this.y, rectWidth, rectHeight, 0x000FF);
        //this.scene.physics.add.existing(swordAttackArea);
        //swordAttackArea.setSize(rectWidth, rectHeight);
        swordAttackArea.setVisible(true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
           swordAttackArea.setVisible(false);
           swordAttackArea.destroy();
        });
    }
    //Ataque de defensor (puñetazo)
    defenderAttack(){
        //El ataque consiste en un rectangulo invisible que representa el área de ataque del puñetazo
        //Diemnsiones
        const rectWidth = 80 , rectHeight = 80; 
        //Area de ataque
        const punchAttackArea = this.scene.add.rectangle(this.x + 73, this.y, rectWidth, rectHeight, 0x000FF);
        //this.scene.physics.add.existing(swordAttackArea);
        //swordAttackArea.setSize(rectWidth, rectHeight);
        punchAttackArea.setVisible(true);

        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
           punchAttackArea.setVisible(false);
           punchAttackArea.destroy();
        });

    }

    //Ataque del vitruoso (instanciar torreta)
    virtuousAttack(){
        //Controlamos las instancias de las torretas (recordemos que solo puede haber una)
        // Si ya hay una torreta existente, la destruimos antes de crear una nueva
        if (this.scene.oneTurret) {
            this.scene.oneTurret.destroy();
        }
        // Sino, instanciamos una nueva torreta (añadimos un poco de distancia entre la instancia y el jugador) y la igualamos
        // a la nueva torreta
        if(this.dir == 1){ // si virtuoso apunta a la derecha
            this.scene.oneTurret = new Turret(this.scene, this.x + 30, this.y - 150, 'turret', this.dir);
        }
        else { //Si apunta a la izquerda
            this.scene.oneTurret = new Turret(this.scene, this.x - 30, this.y - 150, 'turret', this.dir);
            //Invertimos la torreta
            this.scene.oneTurret.setFlip(true, false);
        }
    }

//#endregion
    //Metodo para controlar la vida del jugador
    recieveDamage(damage){
        this.lifeComp.Damage(damage);
        console.log("AUUU");
    }

    //Metodo para controlar que animaciones debe hacer el personaje en cada momento del juego
    animationManager(){
        //Si esta en el aire
        if(!this.body.onFloor()){ 
            if(this.anims.currentAnim.key !== this.spriteId + '_jump') { 
                this.play(this.spriteId + '_jump'); }
        }
        //Si se mueve en cualquier direccion en el suelo
        else if(this.body.velocity.x != 0){ 
            if(this.anims.currentAnim.key !== this.spriteId + '_move'){ this.play(this.spriteId + '_move'); }
        }
        //Si esta atacando
        else if(this.isAttack){ 
            if(this.anims.currentAnim.key !== this.spriteId + '_attack'){
                //Reproducimos animacion de atatque
                this.play(this.spriteId + '_attack');
                //Cuando se finaliza la animacion de ataque, se ejecuta lo que hay dentro
                this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                    console.log('La animación ha terminado:', this.anims.currentAnim.key);
                    //Ponemos booleano de ataque a false
                    this.isAttack = false;
                });
            }
        }
        //Si esta quieto
        else {
            if(this.anims.currentAnim.key !== this.spriteId + '_idle'){ this.play(this.spriteId + '_idle'); }
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