import Proyectil from "../../Objetos/Proyectil.js";
import SerVivo from "../serVivo.js";

export default class Puton extends SerVivo{
    constructor(scene, x, y){
        const life = 10;
        super(scene, x, y, null, life);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.setScale(0.15, 0.15);
        this.scene.add.existing(this);
        this.player = this.scene.player;
        this.distanceToPlayer = this.CalculateDisToPlayer();

        //Ajustes
        this.speed = 100;
        this.meleeDistance = 150;
        this.rangeDisctance = 250;
        this.rangeSpeed = 2.5;
        this.atackDelay = 1;
        this.direction = 1; // 1 es derecha, -1 es izquierda
        this.meleeDamage = 1;
        this.rangeDamage = 1;
        this.cooldown = false; //si el cooldown está activado o no
        this.lanzado = false;
        
        // Ajustar el tamaño y la posición del collider para que se centre en el jugador
        const colliderWidth = 182;
        const colliderHeight = 300;
        this.setOrigin(0.5);
        // Ajustar el collider del jugador
        this.body.setSize(colliderWidth, colliderHeight);
        // Centrar Sprite
        this.body.setOffset(0,0);
        
        // Disccionario de estados
        this.MaquinaEstados = {
            ['IDLE']: () => this.idleState(),
            ['PATROL']: () => this.patrolState(),
            ['RANGED_ATTACK']: () => this.rangedAttackState(),
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
        this.manageAnims('puton_idle_anim');
        this.setVelocityX(0);
    }

    patrolState() {
        if (!this.scene || !this.body || !this.scene.physics.world.bodies.contains(this.body)) {
            return;
        }
        this.manageAnims('puton_move_anim');
        
    }

    rangedAttackState() {
        if (!this.scene || !this.body || !this.scene.physics.world.bodies.contains(this.body)) {
            return;
        }
        this.manageAnims('puton_kiss_anim');
        if(!this.lanzado){
            this.atacarRango(); 
        } 
    }

    meleeAttackState() {
        if (!this.scene || !this.body || !this.scene.physics.world.bodies.contains(this.body)) {
            return;
        }
        this.manageAnims('puton_move_anim');
        this.atacarMelee();

    }

    atacarRango() {
        const attackAnimationKey = 'puton_kiss_anim';
        if (this.scene && this.body && this.scene.physics.world.bodies.contains(this.body)) {
            // re-orientamos, quitamos velocity y manejamos anims
            this.CalculateDirToPlayer();
            this.setVelocityX(0);
            this.manageAnims(attackAnimationKey);
            // usamos lanzado para no volver a atacar hasta que pase la animacion de beso y el cooldown
            this.lanzado = true;
            // pcall function que se ejecuta cuando el evento se llama al terminar la animacion de ataque correspondiente
            this.once('animationcomplete-' + attackAnimationKey, () => {
                this.scene.sound.add('heartSound').play();
                new Proyectil(this.scene, this.x, this.y - 10, 'heart', this.direction, this.rangeDamage, this.rangeSpeed, false, 1);
                // usamos cooldown para poner un delay en modo idle después de atacar
                this.cooldown = true;
                this.setCooldown(() => {
                    this.cooldown = false;
                    this.lanzado = false;
                }, 500);
            });
        }
    }

    atacarMelee() {
        const attackAnimationKey = 'puton_move_anim';
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
            } else if (this.distanceToPlayer < this.rangeDisctance) {
                if (this.currentState !== 'RANGED_ATTACK') {
                    this.currentState = 'RANGED_ATTACK';
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