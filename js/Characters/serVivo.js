import LifeComponent from "./lifeComponent.js";
export default class SerVivo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, lifeComp) {
        super(scene, x, y);
        //creamos componente de vida
        this.lifeComp = lifeComp


    }

    recieveDamage(damage){
        this.lifeComp.Damage(damage);
        console.log("AUUU");
    }

    getLives(){
        return this.lifeComp.getCurrentLives();
    }
}