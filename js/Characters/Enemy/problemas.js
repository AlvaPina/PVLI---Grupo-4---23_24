import LifeComponent from "../lifeComponent.js";

export default class Problemas extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, patrolPoints) {
        super(scene, x, y);
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        // Puntos de patrulla (por ejemplo, [{ x: 100, y: 200 }, { x: 400, y: 200 }])
        this.patrolPoints = patrolPoints;
        this.currentPatrolPoint = 0;

        // Ajustes
        this.patrolSpeed = 20;
        this.damageToPlayer = 1;

        // Ajustar el tamaño y la posición del collider para que se centre en el jugador
        const colliderWidth = 182;
        const colliderHeight = 300;
        this.setOrigin(0.5);
        this.body.setSize(colliderWidth, colliderHeight);
        this.body.setOffset(0, 0);

        // Iniciar patrulla
        this.startPatrol();
    }

    startPatrol() {
        this.moveToPatrolPoint();
    }

    moveToPatrolPoint() {
        const point = this.patrolPoints[this.currentPatrolPoint];
        this.scene.physics.moveToObject(this, point, this.patrolSpeed);
    }

    update() {
        super.update();

        // Verifica si el enemigo ha alcanzado el punto de patrulla
        const distanceToPatrolPoint = Phaser.Math.Distance.Between(
            this.x, this.y,
            this.patrolPoints[this.currentPatrolPoint].x,
            this.patrolPoints[this.currentPatrolPoint].y
        );

        if (distanceToPatrolPoint < 10) {
            // Cambiar al siguiente punto de patrulla
            this.currentPatrolPoint = (this.currentPatrolPoint + 1) % this.patrolPoints.length;
            this.moveToPatrolPoint();
        }

        // Verifica la colisión con el jugador
        const overlapping = this.scene.physics.overlap(this, this.scene.player);
        if (overlapping) {
            this.scene.player.recieveDamage(this.damageToPlayer);
        }
    }
}
