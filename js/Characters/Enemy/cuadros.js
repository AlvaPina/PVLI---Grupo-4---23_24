import SerVivo from "../serVivo";

export default class Cuadros extends SerVivo{
    constructor(scene, x, y){
        super(scene, x, y)
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.sprite = 'puton'
        this.setTexture(sprite);
    }

    moverse(){

    }

    atacar(){

    }


}