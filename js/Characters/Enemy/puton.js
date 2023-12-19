import Proyectil from "../../Objetos/Proyectil.js";
import SerVivo from "../serVivo.js";

export default class Punton extends SerVivo{
    constructor(scene, x, y){
        const life = 10;
        super(scene, x, y, life);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        //Ajustes
        this.distanceToPlayer = this.CalculateDisToPlayer();
        this.meleeDistance = 150;
        this.rangeDisctance = 250;
        this.rangeSpeed = 2.5;
        this.atackDelay = 1;

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
            ['MOVING']: () => this.movingState(),
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
        this.MaquinaEstados[this.currentState]();
        this.updateEnemy();
    }

    idleState() {
        if (!this.scene || !this.body || !this.scene.physics.world.bodies.contains(this.body)) {
            return;
        }
        this.manageAnims('puton_idle_anim');
        
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

    moverse() {
        // Implementa la lógica para el movimiento
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
                new Proyectil(this.scene, this.x, this.y - 10, 'heart', this.direction, this.rangeDamage, this.rangeSpeed, false);
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

    CalculateDisToPlayer(){
        const player = this.scene.player;
        this.distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    }

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