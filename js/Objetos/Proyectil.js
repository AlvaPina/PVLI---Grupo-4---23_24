import LifeComponent from "../Characters/lifeComponent.js";
import Player from "../Characters/player.js";
import SerVivo from "../Characters/serVivo.js";

export default class Proyectil extends SerVivo {
    constructor(scene, x, y, texture, dir, damage, speed, tipe) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = speed;
        this.setScale(0.05);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.tipe = tipe; // true -> Proyectil de Aliado, false -> Proyectil de Enemigo

        // Tiempo de vida del proyectil
        this.lifespan = 5000; // 5000 milisegundos o 5 segundos

        // Destruir el proyectil después de su tiempo de vida
        this.setLifeTime(this.lifespan);
  
        // Llama a esta función para manejar la colisión con el suelo.
        this.handleCollisions();

        this.dir = dir;
        this.damage = damage;
    }

    handleCollisions() {
        // Obtiene una referencia al suelo de la escena
        const groundLayer = this.scene.groundLayer;

        // Si no hay una capa de suelo, no hacer nada
        if (!groundLayer) return;

        // Añadir colisionador con el suelo
        this.scene.physics.add.collider(this, groundLayer, () => {
            this.destroy(); // Destruye la poción al colisionar con el suelo
        }, null, this);

        // colisiones con enemigos o colisiones con alliados (player, torreta...)
        if(this.tipe){
            this.scene.physics.add.collider(this, this.scene.enemiesGroup, (proyectil, enemy) => {
                // Dañar al enemigo
                console.log("Colisiono");
                enemy.recieveDamage(proyectil.damage);
                
                // Destruir el proyectil
                proyectil.destroy();
            });
        }
        else{
            this.scene.physics.add.collider(this, this.scene.alliesGroup, (proyectil, allie) => {
                // Dañar al enemigo
                console.log("Colisiono");
                allie.recieveDamage(proyectil.damage);
                
                // Destruir el proyectil
                proyectil.destroy();
            });
            this.scene.physics.add.collider(this, this.scene.player , () => {
                this.scene.player.recieveDamage(this.damage);
                this.destroy(); // Destruye la poción al colisionar con el suelo
            }, null, this);
        }

    }

    setLifeTime(duration) {
        this.scene.time.delayedCall(duration, this.destroy, [], this);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        this.x += this.speed * this.dir;
    }

    getTipe(){
        return this.tipe;
    }
}
