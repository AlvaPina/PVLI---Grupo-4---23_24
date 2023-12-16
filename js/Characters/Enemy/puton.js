import SerVivo from "../lifeComponent.js";

export default class Punton extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        //Ajustes
        this.distanceToPlayer = this.CalculateDisToPlayer();
        this.meleeDistance = 150;
        this.rangeDisctance = 250;
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
            ['MELEE_ATTACK']: () => this.meleeAttackState()
        };
        
        // Estado por defecto
        this.currentState = 'IDLE';
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.MaquinaEstados[this.currentState]();
        this.updateEnemy();
    }

    idleState() {
        this.manageAnims('puton_idle_anim');
        
    }

    movingState(){
        this.manageAnims('puton_move_anim');
        
    }

    rangedAttackState() {
        this.manageAnims('puton_kiss_anim');
        this.atacarRango();
        
    }

    meleeAttackState() {
        this.manageAnims('puton_move_anim');
        this.atacarMelee();

    }

    moverse() {
        // Implementa la lógica para el movimiento
    }

    atacarRango() {
        console.log('atacando en rango');

    }

    atacarMelee() {
        console.log('atacando a melee');
    }

    updateEnemy(){

        this.CalculateDisToPlayer();

        if (this.distanceToPlayer < this.meleeDistance) {
            if (this.currentState !== 'MELEE_ATTACK') {
                this.currentState = 'MELEE_ATTACK';
            }
        }   else if (this.distanceToPlayer < this.rangeDisctance) {
            if (this.currentState !== 'RANGED_ATTACK') {
                this.currentState = 'RANGED_ATTACK';
            }
        }   else {
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
        const currentAnimKey = this.anims.currentAnim ? this.anims.currentAnim.key : null;
        if (currentAnimKey !== animationKey) {
            this.play(animationKey);
        }
    }
}