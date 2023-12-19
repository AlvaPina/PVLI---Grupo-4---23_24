export default class EnemySpawn {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.elapsedTime = 0;
        this.delayTime = 2; // Tiempo para spawnear
        this.numberEnemies = 4;
        //añadimos una zona
        this.spawnZone = this.scene.add.zone(x, y).setSize(50, 50);
        this.scene.physics.world.enable(this.spawnZone);
        this.spawnZone.body.setAllowGravity(false);
    }

    preUpdate(t, dt) {
        this.elapsedTime += dt / 1000;

        // Si el tiempo transcurrido es igual al tiempo de delay reseteamos contador y spawneamos enemigo
        if (this.elapsedTime >= this.delayTime) {
            const overlappingEnemies = this.scene.physics.overlapRect(
                this.spawnZone.x - this.spawnZone.width / 2,
                this.spawnZone.y - this.spawnZone.height / 2,
                this.spawnZone.width,
                this.spawnZone.height,
                this.scene.enemiesGroup.getChildren()
            );

            console.log(overlappingEnemies);

            if(overlappingEnemies.length == 1){
                let type = Phaser.Math.Between(1, this.numberEnemies);
                this.scene.spawnEnemy(type, this.x, this.y);
            }

            this.elapsedTime = 0;
        }
    }
}