import SerVivo from '../Characters/serVivo.js';
import InitEnemy from '../Enemy/initEnemy.js'

export default class Enemy extends SerVivo {
    constructor(scene, x, y, type) {
        const key = Enemy.getAssetKeyByType(type);
        super(scene, x, y, key);

        this.type = type;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.initializeProperties(type);
    }

    update(){
        tryAttack();
        tryFly();
        if(speed > 0){
            UpdatePatrol();
        }
    }

    tryAttack(){
        this.distanceToPlayer = calcularDistanciaJugador();
        if(this.distanceToPlayer < this.distanciaVision){
            if (this.components.MeleeComponent) {
                this.components.MeleeComponent.atacar();
            }
            else if(this.components.RangedComponent){
                this.components.RangedComponent.atacar();
            }
        }
    }

    UpdateFly(){
        
    }

    UpdatePatrol(){

    }

    calcularDistanciaJugador(){
        return Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    }

    initializeProperties() {
        switch (this.type) {
            case 'problemasMatematicos':
                InitEnemy.InitProblemasMatematicos(this);
                break;
            case 'puton':
                InitEnemy.initPuton(this);
                break;
            case 'flyer':
                InitEnemy.InitSombra(this);
                break;
            default:
                this.initDefault();
                break;
        }
    }

    
    /*
    CODIGO ANTERIOR, REUTILIZARÉ COSAS

    updatePatroller() {
        if(this.patroller){ // solo si el enemigo tiene el atributo de
            
            // L�gica de patrulla
            this.x += this.speed * this.direction * this.scene.game.loop.delta * 0.001;

            if (this.x < this.patrolRange.start || this.x > this.patrolRange.end) {
                this.direction *= -1; // Cambia de direcci�n
            }

            // Detectar al jugador y seguirlo
            const player = this.scene.player; // Aseg�rate de que 'player' es accesible en tu escena
            const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

            if (distanceToPlayer < this.detectionRange) {
                // Persigue al jugador
                this.direction = player.x < this.x ? -1 : 1; // Cambia la direcci�n hacia el jugador
                // Aqu� podr�as ajustar la velocidad para la persecuci�n si es diferente de la patrulla
            }
        }
    }


    updateShooter() {

        // Detectar al jugador y disparar
        const now = Date.now();
        const player = this.scene.player; // Aseg�rate de que 'player' es accesible en tu escena
        const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        // L�gica de patrulla
        this.x += this.speed * this.direction * this.scene.game.loop.delta * 0.001;

        if (this.x < this.patrolRange.start || this.x > this.patrolRange.end) {
            this.direction *= -1; // Cambia de direcci�n
        }

        // Detectar al jugador y seguirlo

        if (distanceToPlayer < this.detectionRange) {
            // Persigue al jugador
            this.direction = player.x < this.x ? -1 : 1; // Cambia la direcci�n hacia el jugador
            // Aqu� podr�as ajustar la velocidad para la persecuci�n si es diferente de la patrulla
        }

        if (distanceToPlayer < this.detectionRange && now - this.lastShot > this.shootDelay) {
            // Dispara al jugador
            const direction = player.x < this.x ? -1 : 1;
            const projectileVelocity = new Phaser.Math.Vector2(direction * 300, 0); // Ajusta la velocidad del proyectil

            new Proyectile(this.scene, this.x, this.y, 'enemyProjectile', projectileVelocity);
            this.lastShot = now;
        }
    }

    updateFlyer() {
        // Mover arriba y abajo dentro del rango de vuelo
        this.y += this.speed * this.direction * this.scene.game.loop.delta * 0.001;

        if (this.y < this.flyRange.minY || this.y > this.flyRange.maxY) {
            this.direction *= -1; // Cambia la direcci�n vertical
        }

        // Detectar al jugador y seguirlo
        const player = this.scene.player; // Aseg�rate de que 'player' es accesible en tu escena
        const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        if (distanceToPlayer < this.detectionRange) {
            // Persigue al jugador
            this.direction = player.y < this.y ? -1 : 1; // Cambia la direcci�n hacia el jugador en el eje vertical

            // Opcional: Si quieres que el enemigo tambi�n se mueva horizontalmente hacia el jugador
            const horizontalDirection = player.x < this.x ? -1 : 1;
            this.x += this.speed * horizontalDirection * this.scene.game.loop.delta * 0.001;

            // Aqu� podr�as agregar una animaci�n de ataque o de persecuci�n
        }
    }
    */
}