// Ejemplo de cómo reproducir audio después de hacer clic en un botón
const botonReproducir = document.getElementById('boton-reproducir');
const audio = new Audio('ruta/al/archivo-de-audio.mp3');

botonReproducir.addEventListener('click', () => {
    audio.play();
});