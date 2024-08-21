function manejarJuego(eleccionUsuario) {
    if (!usuarioActual) {
        alert('Por favor, inicia sesión para jugar.');
        return;
    }

    const eleccionComputadora = obtenerEleccionComputadora();
    const resultado = determinarResultado(eleccionUsuario, eleccionComputadora);

    mostrarResultado(eleccionUsuario, eleccionComputadora, resultado);
}

function obtenerEleccionComputadora() {
    const opciones = ['piedra', 'papel', 'tijera'];
    const eleccionAleatoria = opciones[Math.floor(Math.random() * opciones.length)];
    return eleccionAleatoria;
}

function determinarResultado(eleccionUsuario, eleccionComputadora) {
    if (eleccionUsuario === eleccionComputadora) return '¡Empate! Esto no va a quedar así...';

    if (
        (eleccionUsuario === 'piedra' && eleccionComputadora === 'tijera') ||
        (eleccionUsuario === 'papel' && eleccionComputadora === 'piedra') ||
        (eleccionUsuario === 'tijera' && eleccionComputadora === 'papel')
    ) {
        return '¡Ganaste! Querés volver a jugar? Yo me quedaría con la victoria...';
    } else {
        return '¡Perdiste! Defendé tu honor con la revancha';
    }
}

function mostrarResultado(eleccionUsuario, eleccionComputadora, resultado) {
    const mensaje = `Elegiste ${eleccionUsuario}. La computadora eligió ${eleccionComputadora}. Resultado: ${resultado}.`;
    document.getElementById('resultado').textContent = mensaje;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.botonJuego').forEach(boton => {
        boton.addEventListener('click', () => {
            manejarJuego(boton.dataset.eleccion);
        });
    });
});