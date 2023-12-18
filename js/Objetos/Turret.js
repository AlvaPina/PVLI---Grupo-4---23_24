import Proyectil from "./Proyectil.js";
//Constructor de la torreta (ataque propio del virtuoso)  
export default class Turret extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, dir, damage) {
        super(scene, x, y, texture, dir)
        //Añadimos torreta a la escena
        scene.add.existing(this);
        //Añadimos fisicas al objeto
        scene.physics.add.existing(this);
        
        this.setScale(0.1);
        //Añadimos las colisiones entre la torreta y el suelo
        this.scene.physics.add.collider(this, this.scene.groundLayer);
        //this.scene.physics.add.collider(this , this.scene.player);

        //Tiempo de vida de la torreta
        this.lifeTime = 10;
        //Tiempo transcurrido desde la instanciacion de la torreta
        this.elapsedTime = 0;
        //Tiempo de delay entre disparos (en segundos)
        this.delayTime = 2;
        //Tiempo transcurrido desde el último disparo
        this.elapsedTimeShot = 0;
        //Direccion a la que apunta la torreta
        this.dir = dir;
        //Daño que produce la bala (pasada desde el player.js)
        this.bulletDamage = damage;
    };
    //Metodo para disparar
    shoot(){
        new Proyectil(this.scene, this.x, this.y, 'bullet', this.dir, this.bulletDamage, true);
    }
    preUpdate(t, dt){
        super.preUpdate(t, dt);
        this.setVelocityX(0);

        //Convertimos el dt a segundos e incrementamos elapsedTime
        this.elapsedTimeShot += dt / 1000;
        this.elapsedTime += dt / 1000;

        //Si el tiempo transcurrido es igual al tiempo de delay
        if(this.elapsedTimeShot >= this.delayTime){
            //Dispara proyectil
            this.shoot();
            console.log(this.bulletDamage);
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