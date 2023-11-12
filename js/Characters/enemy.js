export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        const key = Enemy.getAssetKeyByType(type);
        super(scene, x, y, key);

        this.type = type;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.initializeProperties(type);
    }

    static getAssetKeyByType(type) {
        const assets = {
            1: 'enemyPatroller',
            2: 'enemyShooter',
            3: 'enemyFlyer',
        };

        return assets[type] || 'defaultEnemy';
    }

    initializeProperties(type) {
        switch (type) {
            case 1:
                this.initPatroller();
                break;
            case 2:
                this.initShooter();
                break;
            case 3:
                this.initFlyer();
                break;
            default:
                this.initDefault();
                break;
        }
    }

    initPatroller() {
        // Propiedades específicas del patrullero
        this.health = 100;
        this.speed = 100;
        this.detectionRange = 200; // rango de detección
        this.patrolRange = { start: this.x - 100, end: this.x + 100 }; // rango de patrulla
        this.direction = 1; // Dirección inicial de patrulla

        // Inicializa animaciones aquí si las tienes
    }

    initShooter() {
        // Propiedades específicas del tirador
        this.health = 150;
        this.speed = 80;
        this.detectionRange = 300;
        this.shootDelay = 2000; // tiempo entre disparos
        this.lastShot = 0;

        // Inicializa animaciones aquí si las tienes
    }

    initFlyer() {
        // Propiedades específicas del volador
        this.health = 120;
        this.speed = 120;
        this.detectionRange = 250;
        this.flyRange = { minY: this.y - 50, maxY: this.y + 50 };
        this.direction = -1; // Dirección vertical inicial

        // Inicializa animaciones aquí si las tienes
    }

    initDefault() {
        // Propiedades por defecto
        this.health = 50;
        this.speed = 50;
    }

    update() {
        switch (this.type) {
            case 1:
                this.updatePatroller();
                break;
            case 2:
                this.updateShooter();
                break;
            case 3:
                this.updateFlyer();
                break;
            default:
                this.updateDefault();
                break;
        }
    }

    updatePatroller() {
        // Lógica de patrulla
        this.x += this.speed * this.direction * this.scene.game.loop.delta * 0.001;

        if (this.x < this.patrolRange.start || this.x > this.patrolRange.end) {
            this.direction *= -1; // Cambia de dirección
        }

        // Detectar al jugador y seguirlo
        const player = this.scene.player; // Asegúrate de que 'player' es accesible en tu escena
        const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        if (distanceToPlayer < this.detectionRange) {
            // Persigue al jugador
            this.direction = player.x < this.x ? -1 : 1; // Cambia la dirección hacia el jugador
            // Aquí podrías ajustar la velocidad para la persecución si es diferente de la patrulla
        }
    }


updateShooter() {
    
    // Detectar al jugador y disparar
    const now = Date.now();
    const player = this.scene.player; // Asegúrate de que 'player' es accesible en tu escena
    const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

    // Lógica de patrulla
    this.x += this.speed * this.direction * this.scene.game.loop.delta * 0.001;

    if (this.x < this.patrolRange.start || this.x > this.patrolRange.end) {
        this.direction *= -1; // Cambia de dirección
    }

    // Detectar al jugador y seguirlo
    const player = this.scene.player; // Asegúrate de que 'player' es accesible en tu escena
    const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

    if (distanceToPlayer < this.detectionRange) {
        // Persigue al jugador
        this.direction = player.x < this.x ? -1 : 1; // Cambia la dirección hacia el jugador
        // Aquí podrías ajustar la velocidad para la persecución si es diferente de la patrulla
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
            this.direction *= -1; // Cambia la dirección vertical
        }

        // Detectar al jugador y seguirlo
        const player = this.scene.player; // Asegúrate de que 'player' es accesible en tu escena
        const distanceToPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        if (distanceToPlayer < this.detectionRange) {
            // Persigue al jugador
            this.direction = player.y < this.y ? -1 : 1; // Cambia la dirección hacia el jugador en el eje vertical

            // Opcional: Si quieres que el enemigo también se mueva horizontalmente hacia el jugador
            const horizontalDirection = player.x < this.x ? -1 : 1;
            this.x += this.speed * horizontalDirection * this.scene.game.loop.delta * 0.001;

            // Aquí podrías agregar una animación de ataque o de persecución
        }
    }
