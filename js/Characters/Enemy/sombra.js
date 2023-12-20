import Proyectil from "../../Objetos/Proyectil.js";
import SerVivo from "../serVivo.js";

export default class Sombra extends SerVivo{
    constructor(scene, x, y){
        const life = 16;
        super(scene, x, y, null, life);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.setScale(0.15, 0.15);
        this.scene.add.existing(this);
        this.player = this.scene.player;
        this.distanceToPlayer = this.CalculateDisToPlayer();

        //Ajustes
        this.speed = 150;
        this.meleeDistance = 250;
        this.atackDelay = 1;
        this.direction = 1; // 1 es derecha, -1 es izquierda
        this.meleeDamage = 2;
        this.cooldown = false; //si el cooldown está activado o no
        
        // Ajustar el tamaño y la posición del collider para que se centre en el jugador
        const colliderWidth = 150;
        const colliderHeight = 250;
        this.setOrigin(0.5);
        // Ajustar el collider del jugador
        this.body.setSize(colliderWidth, colliderHeight);
        // Centrar Sprite
        this.body.setOffset(60,50);
        
        // Disccionario de estados
        this.MaquinaEstados = {
            ['IDLE']: () => this.idleState(),
            ['PATROL']: () => this.patrolState(),
            ['MELEE_ATTACK']: () => this.meleeAttackState(),
        };

        // Estado por defecto
        this.currentState = 'IDLE';

            // Actualizamos el estado del enemigo cada cierto tiempo
        setInterval(() => {
            this.updateEnemy();
            this.MaquinaEstados[this.currentState]();
    
        }, 200);
        this.scene.events.on('update', this.updateEnemy, this);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    idleState() {
        if (!this.scene || !this.body || !this.scene.physics.world.bodies.contains(this.body)) {
            return;
        }
        this.manageAnims('sombra_idle_anim');
        this.setVelocityX(0);
    }

    patrolState() {
        if (!this.scene || !this.body || !this.scene.physics.world.bodies.contains(this.body)) {
            return;
        }
        this.manageAnims('sombra_move_anim');
        
    }

    meleeAttackState() {
        if (!this.scene || !this.body || !this.scene.physics.world.bodies.contains(this.body)) {
            return;
        }
        this.atacarMelee();
    }

    atacarMelee() {
        const attackAnimationKey = 'sombra_move_anim';
        // Verificar si el objeto aún es válido
        if (this.scene && this.body && this.scene.physics.world.bodies.contains(this.body)) {
            this.CalculateDirToPlayer();
            this.manageAnims(attackAnimationKey);
            this.setVelocityX(this.speed * this.direction);

            // Verifica la superposición entre el jugador y el enemigo
            const overlapping = this.scene.physics.overlap(this, this.player);
            if (overlapping) {
                this.player.recieveDamage(this.meleeDamage);
                this.cooldown = true;
                this.setCooldown(() => {
                    this.cooldown = false;
                }, 1000);
            }
        }
    }


    setCooldown(callback, duration) {
        setTimeout(callback, duration);
    }
    // Calculamos el siguiente estado
    updateEnemy() {
        if (!this.scene || !this.body || !this.scene.physics.world.bodies.contains(this.body)) {
            return;
        }
        this.CalculateDisToPlayer();
        // Si hay cooldown hemos dicho que estará en estado IDLE
        if (!this.cooldown) {
            // Obtener el estado dependiendo de la distancia
            if (this.distanceToPlayer < this.meleeDistance) {
                if (this.currentState !== 'MELEE_ATTACK') {
                    this.currentState = 'MELEE_ATTACK';
                }
            } else {
                if (this.currentState !== 'IDLE') {
                    this.currentState = 'IDLE';
                }
            }
        }
        else {
            if (this.currentState !== 'IDLE') {
                this.currentState = 'IDLE';
            }
        }
    }
    // Calculamos a donde tiene que mirar el enemigo y corregimos su orientacion
    CalculateDirToPlayer(){

        this.direction = this.player.x < this.x ? -1 : 1;
        this.flipX = (this.direction === -1);
    }
    // Calculamos la distancia al player
    CalculateDisToPlayer(){
        this.distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    }
    // Logica de aniciones por separado, solo se ejecuta la animación dependiendo del estado
    manageAnims(animationKey) {
        // Verificar si el objeto y la escena aún están definidos y si el objeto no ha sido destruido
        if (this.scene && this.body && this.scene.physics.world.bodies.contains(this.body)) {
            const currentAnimKey = this.anims.currentAnim ? this.anims.currentAnim.key : null;
            if (currentAnimKey !== animationKey) {
                this.play(animationKey);
            }
        }
    }
}