export default class Proyectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, dir, damage) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 8;
        this.setScale(0.05);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        // Tiempo de vida del proyectil
        this.lifespan = 5000; // 5000 milisegundos o 5 segundos

        // Destruir el proyectil después de su tiempo de vida
        this.setLifeTime(this.lifespan);
  
        // Llama a esta función para manejar la colisión con el suelo.
        this.handleCollisionWithGround();

        //Llama a esta funcion para manejar la colision de las pociones con un enemigo de la escena
        this.handleCollisionWithEnemies();

        this.dir = dir;
        this.damage = damage;
    }

    handleCollisionWithGround() {
        // Obtiene una referencia al suelo de la escena
        const groundLayer = this.scene.groundLayer;

        // Si no hay una capa de suelo, no hacer nada
        if (!groundLayer) return;

        // Añadir colisionador con el suelo
        this.scene.physics.add.collider(this, groundLayer, () => {
            this.destroy(); // Destruye la poción al colisionar con el suelo
        }, null, this);
    }

    setLifeTime(duration) {
        this.scene.time.delayedCall(duration, this.destroy, [], this);
    }

    handleCollisionWithEnemies(){
        //Obtenemos a los enemigos de la escena con getEnemies
        let enemies = this.scene.getEnemies();
        this.scene.physics.add.collider(this, enemies, () => {
            //Daña a los enemigos (aun no tenemos enemigos, por eso lo comento) 
            //enemies.lifeComp.Damage(this.damage);
            //Destruimos pocion
            this.destroy();
        });
    }
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.x += this.speed * this.dir;
    }
}
