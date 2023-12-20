import LifeComponent from "./lifeComponent.js";
export default class SerVivo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, vida) {
        super(scene, x, y, texture);
        this.lifeComp = new LifeComponent(vida, this);
        this.texture = texture;
    }

    recieveDamage(damage){
        this.lifeComp.Damage(damage);
        console.log("AUUU");
    }

    getLives(){
        return this.lifeComp.getCurrentLives();
    }

    Die(){
        if(this.texture == 'turret'){
            console.log("torreta");
            this.scene.desactivarTorreta();
        }
        else{
            this.destroy();
        }
    }
}