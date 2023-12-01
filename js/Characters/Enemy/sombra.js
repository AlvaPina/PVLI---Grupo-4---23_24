import SerVivo from "../serVivo";


export default class Sombra extends SerVivo{
    constructor(scene, x, y){
        super(scene, x, y)
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.sprite = null
        this.setTexture(sprite);
    }

    moverse(){
        
    }


}