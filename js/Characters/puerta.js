import LifeComponent from './lifeComponent.js';

class Puerta extends SerVivo{
    constructor(scene, x, y) {
        super(scene, x, y, 'puerta');
        this.sprite = 'puerta'
        this.setTexture(sprite);
    }
}