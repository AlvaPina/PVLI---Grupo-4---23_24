import SerVivo from "../Characters/serVivo.js";
import Proyectil from "./Proyectil.js";
//Constructor de la torreta (ataque propio del virtuoso)  
export default class Turret extends SerVivo {
    constructor(scene, texture, damage) {
        const life = 3;
        super(scene, 0, 0, texture, life)
        //Añadimos torreta a la escena
        scene.add.existing(this);
        //Añadimos fisicas al objeto
        scene.physics.add.existing(this);
        
        this.setScale(0.1);
        //Añadimos las colisiones entre la torreta y el suelo
        this.scene.physics.add.collider(this, this.scene.groundLayer);
        //this.scene.physics.add.collider(this , this.scene.player);

        //Tiempo de vida de la torreta
        this.lifeTime = 15;
        //Tiempo transcurrido desde la instanciacion de la torreta
        this.elapsedTime = 0;
        //Tiempo de delay entre disparos (en segundos)
        this.delayTime = 2;
        //Tiempo transcurrido desde el último disparo
        this.elapsedTimeShot = 0;
        //Daño que produce la bala (pasada desde el player.js)
        this.bulletDamage = damage;
        //Velocidad de la bala
        this.bulletSpeed = 3;

        //confi inicial
        this.isActive = false;
        this.setVisible(false);
    };
    //Metodo para disparar
    shoot(){
        this.scene.sound.add('turretShootSound').play();
        new Proyectil(this.scene, this.x, this.y, 'bullet', this.dir, this.bulletDamage, this.bulletSpeed, true, 1);
    }
    preUpdate(t, dt){
        super.preUpdate(t, dt);
        if(this.isActive){ //solo la actualizamos si está activa

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
                this.isActive = false;
                console.log("Torreta desactivada!");
                this.setActive(false, null);
                this.elapsedTime = 0;
            }
        }
    }
    setActive(bool, dir){ // si true, activamos torreta; si false, desactivamos
        this.isActive = bool;
        this.setVisible(bool);
        if(bool){
            this.setVelocityY(0)
            this.scene.sound.add('turretSound').play();
            const offset = 20;
            this.x = this.scene.player.x
            this.y = this.scene.player.y - offset;
            this.dir = dir;
            this.elapsedTime = 0;
            this.setFlipX(dir === -1);
            this.lifeComp.Health(4);
        }
    }
}