import SerVivo from "./serVivo";

export default class Enemy extends SerVivo {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height); // Rectángulo rojo (puedes cambiar el color)
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}
// EN UN FUTURO CUANDO TENGAMOS TODOS LOS ENEMIGOS ESTA CLASE SERÁ UTIL