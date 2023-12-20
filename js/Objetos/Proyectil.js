import LifeComponent from "../Characters/lifeComponent.js";
import Player from "../Characters/player.js";
import SerVivo from "../Characters/serVivo.js";

export default class Proyectil extends SerVivo {
    constructor(scene, x, y, texture, dir, damage, speed, type, gravity) {

        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = speed;
        this.gravity = gravity;
        this.dir = dir; //valor 1 derecha, valor -1 izquierda
        this.setScale(0.05);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.type = type; // true -> Aliado, false -> Enemigo
        this.damage = damage;

        // Calcular la velocidad inicial en las direcciones x e y
        this.velX = this.speed * this.dir * 100; // Ajusta el multiplicador según sea necesario
        this.velY = -this.speed * 40; // Ajusta el multiplicador según sea necesario
        // Aplicar la gravedad
        this.setVelocityX(this.velX); // Mantener la velocidad en la dirección x constante
        this.setVelocityY(this.velY);


        // Tiempo de vida del proyectil
        this.lifespan = 5000; // 5000 milisegundos o 5 segundos

        // Destruir el proyectil después de su tiempo de vida
        this.setLifeTime(this.lifespan);

        // Llama a esta función para manejar la colisión con el suelo.
        this.handleCollisions();
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
        if(this.type){
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
        // Si el proyectil ha alcanzado el suelo, destruirlo
        if (this.y >= this.scene.game.config.height) {
            this.destroy();
        }
        if(this.body){
            this.setVelocityY(this.body.velocity.y -= this.gravity);
        }
    }
    getType(){
        return this.type;
    }
}
