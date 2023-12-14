export default class RedBull extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'redbull');
        //Instanciamos personaje en escena
        scene.add.existing(this);
        //Añadimos físicas
        scene.physics.add.existing(this);
        //Añadimos las colisiones entre el player y el suelo
        scene.physics.add.collider(this, scene.ground);
        //Seteamos escala y origen
        this.setScale(0.2);
        this.setOrigin(0,0);
        //Animacion del redBull mediante un Tween
        scene.tweens.add({
        targets: this,
        scale: 0.16,
              duration: 1000,
              ease: 'Sine.easeInOut',
              yoyo: true,
              repeat: -1,
              delay: 2000
        });
        //Numero de vidas extra que se le da al jugador
        this.extraLives = 1; 
        //Manejo de overlaps para detectar cuando interactuan el RedBull y el jugador
        scene.physics.add.overlap(scene.player, this, () => {
            console.log("Andoo locooo!!!");
            //Destruimos este RedBull
            this.destroy();
            //Llamamos al lifeComponent del jugador
            scene.player.lifeComp.Health(this.extraLives);
        });
    }
}