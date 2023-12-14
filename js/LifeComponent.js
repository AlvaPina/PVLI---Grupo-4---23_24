export default class LifeComponent {
    //Constructor de la clase LifeCompoenent de la que heredaran todos aquellos objetos que manejen sistema de vidas
    //Por ejemplo: personalidades jugables y enemigos
    constructor(iniLives, gameObject){
        this.lives= iniLives;
        this.maxLives= iniLives;
        this.gameObject = gameObject;
    }

    //Metodo para manejar el daño de vida
    Damage(damageLives){
        this.lives -= damageLives;
        //Controlamos que no se salga de los limites
        if(this.lives <= 0){
            this.lives = 0;
            this.Die();
        }
        console.log(this.lives);
    }

    //Metodo para manejar el aumento de vida
    Health(healthLives){
        this.lives += healthLives;

        //Controlamos que no se salga de los limites
        if(this.lives > this.maxLives){
            this.lives = this.maxLives;
        }
    }
    //Metodo que destruye el gameObject asociado al LifeComponent cuando muere
    Die(){
        this.gameObject.destroy();
    }
    //Metodo que devuelve las vidas actuales de la entidad asociada
    getCurrentLives(){
        return this.lives;
    }

}