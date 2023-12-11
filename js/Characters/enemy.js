export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height); // Rectángulo rojo (puedes cambiar el color)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        //Dibujado de rectngulo provisional
        const graphics= scene.add.graphics();
        graphics.fillStyle(0xFF0000, 1); // Color rojo
        graphics.fillRect(0, 0, width, height);
        const texture = graphics.generateTexture('enemyTexture', width, height);
        graphics.destroy(); // Destruir el gráfico, ya que no lo necesitamos más
        this.setTexture('enemyTexture');
        //Ajustamos collider
        this.body.setSize(width, height);
        // Propiedades específicas del enemigo
        this.damageAmount = 1; // Cantidad de daño que el enemigo inflige al jugador
    }
}