export default class EnemySpawn {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.elapsedTime = 0;
        this.delayTime = 5; // Tiempo para spawnear
        this.numberEnemies = 4;
    }

    preUpdate(t, dt) {
        this.elapsedTime += dt / 1000;

        // Si el tiempo transcurrido es igual al tiempo de delay
        if (this.elapsedTime >= this.delayTime) {
            let type = Phaser.Math.Between(1, this.numberEnemies);
            this.scene.spawnEnemy(type, this.x, this.y);
            // Reseteamos contador de elapsedTime
            this.elapsedTime = 0;
        }
    }
}