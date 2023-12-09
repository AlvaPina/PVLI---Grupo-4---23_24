import Bullet from  './Bullet.js';
//Constructor de la torreta (ataque propio del virtuoso)  
export default class Turret extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        //Añadimos torreta a la escena
        scene.add.existing(this);
        //Añadimos fisicas al objeto
        scene.physics.add.existing(this);
        
        this.setScale(0.4, 0.4);
        //Añadimos las colisiones entre la torreta y el suelo
        this.scene.physics.add.collider(this, this.scene.ground);
        //this.scene.physics.add.collider(this , this.scene.player);

        //Tiempo de vida de la torreta
        this.lifeTime = 10;
        //Tiempo transcurrido desde la instanciacion de la torreta
        this.elapsedTime = 0;
        //Tiempo de delay entre disparos (en segundos)
        this.delayTime = 2;
        //Tiempo transcurrido desde el último disparo
        this.elapsedTimeShot = 0;
    };
    //Metodo para disparar
    shoot(){
        let bullet = new Bullet(this.scene, this.x + 70, this.y, 'bullet');
    }
    preUpdate(t, dt){
        super.preUpdate(t, dt);
        this.setVelocityX(0);

        //Convertimos el dt a segundos e incrementamos elapsedTimes
        this.elapsedTimeShot += dt / 1000;
        this.elapsedTime += dt / 1000;

        //Si el tiempo transcurrido es igual al tiempo de delay
        if(this.elapsedTimeShot >= this.delayTime){
            //Dispara proyectil
            this.shoot();
            console.log("Dispara Torretaaaa");
            //Reseteamos contador de elapsedTime
            this.elapsedTimeShot = 0;
        }
        //Si el tiempo transcurrido es igual al timepo de vida
        if(this.elapsedTime >= this.lifeTime){ 
            //Destruimos proyectil
            this.destroy();
            console.log("Torreta destruida!");
        }
    }
}