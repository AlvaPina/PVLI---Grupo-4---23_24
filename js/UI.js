export default class UI extends Phaser.GameObjects.Container {
    constructor(scene, player){
        super(scene,player);

        this.player = player;
        //Creamos el grupo de imagenes de los corazones
        this.heartsGroup = scene.add.group();
        //Leemos la vida del jugador
        const heartsCount = this.player.lifeComp.getCurrentLives();
        //Distancia entre el renderizado de corazones (lo incremntamos en el bucle para que se rendericen separados)
        let distanceBetweenhearts = 80;
        //recorremos la cantidad de corazones recibida por el lifeComp
        for(let i = 0; i < heartsCount; i++){
            const heart = this.scene.add.image( distanceBetweenhearts, 20, 'heart');
            //para que el corazon permanezaca fijo al mover la camara
            heart.setScrollFactor(0);
            heart.setOrigin(0, 0);
            //Seteamos su escala
            heart.setScale(0.15);
            //Añadimos corazon al grupo
            this.heartsGroup.add(heart);
            //Incrementamos separacion
            distanceBetweenhearts += 50;
        }
        //Icono de la personalidad seleccionada
        this.iconPersonalityId = this.player.spriteId;
        //Añadimos a la escena el icono de la personalidad seleccionada
        this.icon = this.scene.add.image( 0, 0, this.iconPersonalityId + '_icon');
        this.icon.setScrollFactor(0);
        this.icon.setOrigin(0, 0);
        this.icon.setScale(0.3);
 
    }
    
    // Actualiza la UI de vida cuando cambiamos la ui (lo llamamos en el update del Player)
    updateUI(){
        // Obtenemos las vidas actuales del jugador en timepo de ejecucion
        const lives = this.player.lifeComp.getCurrentLives();
        //Iteramos sobre los corazones en la UI y actualizamos la vida
        this.heartsGroup.children.iterate((heart, index) => {
            //Si el index actual es menor que las vidas -> corazon lleno
            if (index < lives) {
                heart.setTexture('heart');
            //Si el index es mayor que las vidas actuales ->corazon vacio
            } else {
                heart.setTexture('no_heart');
            }
        });

        //Actualizamos el icono de la personalidad
        this.iconPersonalityId = this.player.spriteId;
        this.icon.setTexture(this.iconPersonalityId + '_icon');
    }
}
