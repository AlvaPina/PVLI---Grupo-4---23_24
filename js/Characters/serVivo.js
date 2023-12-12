export default class SerVivo extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, speed, life, key){
        super(scene, x, y , key);
        this.life = life // null si no tiene vida
        this.speed = speed
    }

    quitarVida(cantidad){
        this.life += cantidad;
    }

    añadirVida(cantidad){
        this.life -= cantidad;
    }

    animacionMuerte(){
        
    }
}
