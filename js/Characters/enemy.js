// Archivo: Enemy.js
export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        const key = Enemy.getAssetKeyByType(type);
        super(scene, x, y, key);

        this.type = type;
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        // Inicializaci�n de propiedades seg�n el tipo
        this.initializeProperties(type);
    }

    static getAssetKeyByType(type) {
        const assets = {
            1: 'enemyType1',
            2: 'enemyType2',
            // ... y as� sucesivamente
        };

        return assets[type] || 'defaultEnemy';
    }

    initializeProperties(type) {
        switch (type) {
            case 1:
                // Propiedades para el enemigo tipo 1
                this.health = 100;
                this.damage = 10;
                // Inicializar animaciones
                this.initAnimations('type1');
                break;
            case 2:
                // Propiedades para el enemigo tipo 2
                this.health = 150;
                this.damage = 20;
                // Inicializar animaciones
                this.initAnimations('type2');
                break;
            // A�ade m�s casos seg�n sea necesario.
            default:
                // Propiedades por defecto
                this.health = 50;
                this.damage = 5;
                // Inicializar animaciones por defecto
                this.initAnimations('default');
                break;
        }
    }

    initAnimations(type) {
        // Aqu� definir�as las animaciones basadas en el tipo.
        // Por ejemplo:
        this.scene.anims.create({
            key: `${type}Walk`,
            frames: this.scene.anims.generateFrameNumbers(key, { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Y luego, para reproducir la animaci�n:
        this.play(`${type}Walk`);
    }

    update() {
        // Aqu� ir�a la l�gica de IA de cada enemigo.
        // Puedes hacerlo condicionalmente seg�n el tipo, o incluso
        // tener m�todos separados que sean llamados aqu� dependiendo del tipo.
    }
}
