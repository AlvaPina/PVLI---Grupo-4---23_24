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
        const spriteWidth = 300;
        const spriteHeight = 300;

        // Ajustar el tamaño y la posición del collider para que se centre en el jugador
        const colliderWidth = spriteWidth;
        const colliderHeight = spriteHeight;

        // Ajustar el collider
        this.body.setSize(colliderWidth, colliderHeight);
        this.body.setOffset((spriteWidth - colliderWidth) / 2, (spriteHeight - colliderHeight) / 2);

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

        //Booleanos
        //Controla el ataque
        this.isAttack = false;
        

        // Eventos de raton
        this.scene.input.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.isAttack = true; // Activar el ataque
                this.attack();
            }
        });
        //creamos componente de vida
        this.lifeComp = new LifeComponent(iniLives, this);
        this.spriteId = spriteId;
        this.speed = speed;
        this.scene = scene;
        //this.indexPersona = 0;
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
        //Input para salto (Comprobamos si toca el suelo o no)
        if (this.cursors.space.isDown && this.body.touching.down) {
            this.setVelocityY(this.speed * -1);
            console.log("Salto");
        } 
        //Izquierda
        if (this.cursors.left.isDown && !this.isAttack) { 
            this.setVelocityX(this.speed * -1);
			this.setFlip(true, false);
            console.log("Izquierda");
        }
        //Derecha
        else if (this.cursors.right.isDown && !this.isAttack) {
            this.setVelocityX(this.speed * 1);
            this.setFlip(false, false);
            console.log("Derecha");
        }
        //Si no hay input, idle
        else {
            this.setVelocityX(0);
        }
    }

    attack() {
        //Depndiendo del spriteId seleccionado, se hace un ataque u otro
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
        this.setVelocityX(0);
        //Instanciamos una nueva pocion lanzable
        new Proyectile(this.scene, this.x, this.y, 'potion');
        console.log("Pocion lanzada");
    }

    protagonistAttack(){

    }

    defenderAttack(){
    }
    //Ataque del vitruoso (instanciar torreta)
    virtuousAttack(){
        this.setVelocityX(0);
        //Controlamos las instancias de las torretas (recordemos que solo puede haber una)
        // Si ya hay una torreta existente, la destruimos antes de crear una nueva
        if (this.scene.oneTurret) {
            this.scene.oneTurret.destroy();
        }
        // Sino, instanciamos una nueva torreta (añadimos un poco de distancia entre la instancia y el jugador) y la igualamos
        // a la nueva torreta
        this.scene.oneTurret = new Turret(this.scene, this.x + 150, this.y - 150, 'turret');
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
        
        else if(this.body.velocity.x != 0){ 
            if(this.anims.currentAnim.key !== this.spriteId + '_move'){ this.play(this.spriteId + '_move'); }
        }
        else if(this.isAttack == true){ //Si esta atacando
            if(this.anims.currentAnim.key !== this.spriteId + '_attack'){
                this.play(this.spriteId + '_attack');
                this.isAttack = false; // Asegúrate de restablecer la bandera después de ejecutar la animación
            }
        }
        else {
            if(this.anims.currentAnim.key !== this.spriteId + '_idle'){ this.play(this.spriteId + '_idle'); }
        }
    }

    //Metodo booleano para comprobar si el jugador, ha pulsado la tecla control para acceder al menu de seleccion
    changePersonality(){
        if(this.cursors.control.isDown){
            console.log(this.spriteId);
            return true;
        }
        return false;
    }
}
