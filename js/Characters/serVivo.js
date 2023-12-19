import LifeComponent from "./lifeComponent.js";
export default class SerVivo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, vida) {
        super(scene, x, y, texture);
        this.lifeComp = new LifeComponent(vida, this);
    }

    recieveDamage(damage){
        this.lifeComp.Damage(damage);
        console.log("AUUU");
    }

    getLives(){
        return this.lifeComp.getCurrentLives();
    }
}