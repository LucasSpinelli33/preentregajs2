function manejarJuego(eleccionUsuario) {
    if (!usuarioActual) {
        Swal.fire({
            title: 'Inicio de sesión requerido',
            text: 'Por favor, inicia sesión para jugar.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
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
    if (eleccionUsuario === eleccionComputadora) {
        return '¡Empate! Esto no va a quedar así...';
    }

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

    Swal.fire({
        title: resultado.includes('Ganaste') ? '¡Ganaste!' : '¡Perdiste!',
        text: resultado,
        icon: resultado.includes('Ganaste') ? 'success' : 'error',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Revancha'
    }).then(result => {
        if (result.isDismissed) {
            console.log('El usuario decidió no jugar de nuevo.');
        } else {
            console.log('El usuario decidió jugar de nuevo.');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.botonJuego').forEach(boton => {
        boton.addEventListener('click', () => {
            manejarJuego(boton.dataset.eleccion);
        });
    });
});