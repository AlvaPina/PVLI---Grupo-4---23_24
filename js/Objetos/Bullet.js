//Constructor de la bala instanciada por torreta   
export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, dir, damage) {
        super(scene, x, y, texture)
        //Añadimos torreta a la escena
        scene.add.existing(this);
        //Añadimos fisicas al objeto
        scene.physics.add.existing(this);
        //Ajustamos escala
        this.setScale(0.05);
        //Ponemos limites con el mundo
        this.setCollideWorldBounds(true);

        //Parametros de la bala
        //velocidad de la bala
        this.speed = 3;
        //Tiempo de vida de la bala (en segundos)
        this.timeLife = 5;
        //Tiempo transcurrido
        this.elapsedTime = 0;
        //Direccion a la que apunta la torreta
        this.dir = dir;
        //Llama a esta funcion para manejar la colision de las pociones con un enemigo de la escena
        this.handleCollisionWithEnemies();
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
        this.setVelocityY(0);
        //Incrementamos elapsedTime
        this.elapsedTime += dt / 1000;
        //Incrementamos velocidad de la bala
        this.x += this.speed * this.dir;
        if(this.elapsedTime >= this.timeLife){
            this.destroy();
        }
    }
}