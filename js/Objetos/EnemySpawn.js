export default class EnemySpawn extends Phaser.GameObjects.GameObject {
    constructor(scene, x, y) 
    {
        super(scene, 'enemySpawn');
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.elapsedTime = 0;
        this.delayTime = 2; // Tiempo para spawnear
        this.numberEnemies = 4;
        //añadimos una zona
        this.spawnZone = this.scene.add.zone(x, y).setSize(200, 50);
        this.scene.physics.world.enable(this.spawnZone);
        this.spawnZone.body.setAllowGravity(false);
    }

    preUpdate(t, dt) {
        this.elapsedTime += dt / 1000;

        // Si el tiempo transcurrido es igual al tiempo de delay reseteamos contador y spawneamos enemigo
        if (this.elapsedTime >= this.delayTime) {
            const overlappingEnemies = this.scene.physics.overlapRect( //comprobar si no hay enemigos encima
                this.spawnZone.x - this.spawnZone.width / 2,
                this.spawnZone.y - this.spawnZone.height / 2,
                this.spawnZone.width,
                this.spawnZone.height,
                this.scene.enemiesGroup.getChildren()
            );

            console.log(overlappingEnemies);


            if(overlappingEnemies.length == 1){
                //Probabilidad del 10% de spawn
                let number = Phaser.Math.Between(1, 10);
                if(number === 1){
                    let type = Phaser.Math.Between(1, this.numberEnemies);
                    this.scene.spawnEnemy(type, this.x, this.y);
                }
            }

            this.elapsedTime = 0;
        }
    }
}