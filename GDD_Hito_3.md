


TID











Documento de diseño de videojuego:
Desarrollado por Dummy Studios (Grupo 04)
Nombre de los miembros: Luis Javier Navarrete Pulupa, Álvaro Piña Sánchez-Sierra, Jose E. Robles Roca, David Palacios Daza.
Versión 3.0 – 15 de Diciembre de 2023
Histórico de Versiones del documento:
Versión 1.0 – 8 de Octubre de 2023



 1.    Ficha técnica
Título: TID
Género: Plataformas-RPG
Target: Todos los públicos
Rating: +12
Plataforma: PC (Ordenadores con navegador Chrome, teclado y ratón)
Modos de juego: 1 jugador
2.    Descripción
TID es un videojuego de plataformas en el cual controlaremos a Will, un chico que padece ciertos trastornos mentales y ,por si fuera poco, una personalidad múltiple. A lo largo del juego, tendremos que explorar diversos mundos imaginarios en base a nuestras personalidades y hacer frente a enemigos de nuestro día a día, como problemas de matemáticas…
3.	Jugabilidad
3.1. Movimiento del personaje
El jugador se puede mover lateralmente de izquierda a derecha y podrá saltar y agacharse. Además, el jugador podrá hacer un doble salto dando dos veces seguidas el botón de salto. 
3.2. Cámara
La cámara poseerá un movimiento tipo Smooth que sigue al jugador a medida que este avanza. Se puede volver atrás si el jugador lo desea, y la cámara seguirá poseyendo este tipo de movimiento.
3.3. Mecánicas del jugador
El jugador a lo largo del juego podrá cambiar entre 4 personalidades jugables: Lógica, Defensor, Virtuoso y Protagonista.

Cada una de estas personalidades jugables poseerá una ataque único que los distingue del resto.


3.4. Mecánicas del escenario
En cuanto a mecánicas de escenario, los distintos niveles del juego van a poseer varias plataformas flotantes en las cuales el jugador se va a poder posar. 
En algunos niveles, también habrá puertas que el jugador podrá destruir mediante un ataque. 
En algunos niveles habrá caminos ocultos que el jugador solo podrá ver si posee la personalidad del virtuoso.
Todos los niveles del juego están compuestos por enemigos que intentarán herir al jugador. Hay enemigos que pueden lanzar proyectiles y otros que intentan hacerte daño cuerpo a cuerpo. la idea es que los enemigos posean una de las habilidades pertenecientes a las diferentes personalidades del juego.
4.	Diseño de nivel
Todos los niveles del juego serán rejugables debido a que estarán interconectados entre ellos, es decir, cuando estés en un nivel y te muevas a otro que ya hayas jugado, todo en ese mapa se recargará (enemigos, objetos consumibles…) y se podrán seleccionar en un mapa en el que el jugador podrá elegir qué nivel en concreto quiere jugar. 
El tamaño de los niveles es fijo, y tendrá un principio y un final. A continuación se muestran distintos bocetos sobre los niveles a implementar en el videojuego:





Explicaciones:
Cruces Rojas: Representan a los enemigos y su posición en el mapa
Camino Oculto: Camino que solo se podrá ver si se posee la personalidad del virtuoso (están marcadas por la palabra virtuoso).
El diseño de estos mapas están inspirados en los juegos 2D de Super Mario y estos diseños son provisionales, no son los finales, y podrían sufrir modificaciones conforme vayamos haciendo las mecánicas.
5.	HUD
a.    5.1. Explicación de los elementos del HUD y su funcionamiento

HUD InGame










El HUD InGame consta de un elemento muy sencillos en la esquina superior izquierda. Primero tenemos un icono que muestra el personaje que el jugador controla en ese momento y una barra que indica la cantidad de energía vital que posee la personalidad jugable.
Justo en la derecha, tenemos una pila de imágenes que representan el estado de las personalidades jugables. Si está el icono coloreado de gris, significa que la personalidad no tiene vida y no se puede seleccionar. Si el icono no está gris, se puede seleccionar. (cambiarlo)

HUD Selección de personaje

Si pulsamos la tecla Control, podremos acceder al menú de selección de personalidad. En el momento que accedemos a este menú, el juego se para por completo/ mov slow (por determinar), y nos encontramos con esta rueda de selección. Los personajes que están en gris no se pueden seleccionar y se desbloquearan más tarde. Para seleccionar una personalidad, solo deberá clicar en el icono.


HUD de Inicio
Menú de inicio en el que podemos seleccionar si empezar a jugar o ir a opciones.
HUD de opciones
Menú de opciones para bajar/ subir sonido de la música/ efectos de sonido y abajo una explicación con los controles.
HUD Gameover
El fondo se ve de un color muy visible y despues te lleva al menú de inicio




6.	Visual
El estilo visual del juego es desenfadado, cartoon e inocente, donde los personajes son como una especie de marioneta o muñeco andante que carecen de extremidades. Además, todos los personajes parecen ser hechos con rotuladores en Paint.
La idea principal de diseño de cada nivel es en base a las distintas personalidades jugables que se van desbloqueando en los distintos niveles.
Diseño de nivel (Lógica):
Entorno: Una clase pensada para escapar hacia la libertad.
Enemigos: Variables matemáticas que cobran vida e intentan herir la salud mental a nuestro personaje con ecuaciones matemáticas.
Diseño de nivel (Defensor):
Entorno: Una ciudad llena de peligros donde reina el crimen y los delitos. Una puerta escondida accesible a través de un balcón tras realizar un peligroso salto.
Enemigos: "Putones" enemigos que pueden distraer a nuestro personaje y que hieren a nuestro protagonista mediante abrazos.
Diseño de nivel (Virtuoso):
Entorno: Un lugar lleno de arte, los cuadros y pilares flotantes que formarán un camino mientras haces parkour.
Enemigos: “Cuadros” enemigos que vuelan y persiguen al jugador volando.


Diseño de nivel (Protagonista): Nos falta hablar de ello
Entorno: Un escenario con focos que le apuntan todo el rato con el fin de agobiar al protagonista. Es un mapa preparado para oleadas.
Enemigos: Sombras de conocidos de Will, como amigos y familiares, pero que intentan atrapar a nuestro personaje para llevarlo a la depresión mediante comentarios hirientes.
(Opcional) Centro Psiquiátrico:
Entorno: Pasillos y habitaciones de un hospital psiquiátrico oscuro y lúgubre. 
Enemigos: Este nivel simplemente consta de un jefe final, el Bote de pastillas gigantes que intenta suprimir a nuestro personaje a través de proyectiles en forma de pastillas.
8.	Contenido
a.    8.1. Historia
Will es un niño normal con demasiada imaginación que en un momento bajo el estrés de bachillerato desarrolla múltiples personalidades, la primera que se manifiesta es la lógica, siendo sus enemigos los problemas de matemáticas, a medida que termina bachillerato “consigue” pareja(enemigos Putones) y desarrolla la personalidad de protección, cuando entra a la universidad se mete a una carrera de bellas artes y queriendo seguir a los grandes maestros desarrolla una personalidad virtuosa, que le permite encontrar caminos que antes no existían y por último cuando ya la gente a su alrededor se da cuenta de sus problemas desarrolla una personalidad de protagonista ya que todo el mundo intenta hablar con él para ayudarle, (a partir de aquí opcional depende de si nos da la vida), antes de que le intenten internar en un centro psiquiátrico donde las pastillas le quitan todo lo conseguido.(personalidades, pareja….).
b.	8.2. Niveles
Tras el hito anterior, se ha decidido que el juego tendrá 3 niveles en los que cada uno tendrá una ambientación distinta basada en la personalidad protagonista de dicho nivel tal y como se explicó anteriormente. (El 4to nivel es opcional en el caso de que a nuestro equipo le sobre tiempo).

En cada nivel predominará el enemigo nuevo de ese nivel, sin embargo, no descartamos la posibilidad de que aparezcan enemigos anteriores.

c.	8.3. Personajes y enemigos
Personajes: Todos los personajes tienen un ataque y una habilidad especial a excepción de Lógico.






Enemigos









d.	8.4. Objetos
A lo largo de los niveles habrá objetos curativos esparcidos, llamados RedBull, que sirve para recuperar energía vital (si es necesario añadiremos más).









7. Stats
(A falta de mirarlo en el juego para balancearlo.)

La vida del jugador está compartida con todos las personalidades del juego. Si una de las personalidades muere, todas lo harán.

Todas las personalidades tienen 10 puntos de vida (en un principio) compartidos.
En la siguiente tabla se ve la cantidad de daño que hacen a los enemigos.



A lo largo de los niveles, habrá distintos tipos de enemigos, con una cantidad de vida y de puntos de daño que le quita al jugador con sus ataques. 



8.	Herencia

9.	Referencias
●     Hollow Knight (Team Cherry, 2017)
●     Castlevania (Konami Corporation, 1986)
 Super Mario Bros. 3. (1988). [Nintendo EAD]. Nintendo.


Repositorio:


Red Social:
