let usuarioActual = null;
let mostrarTodos = false;

async function obtenerDatosUsuarios() {
    try {
        const response = await fetch('./JSON/usuarios.json');
        if (!response.ok) {
            throw new Error('Error en la red al obtener los datos.');
        }
        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        console.error('Error al obtener datos de usuarios:', error);
        return [];
    }
}

async function mostrarUsuariosAdheridos() {
    const usuariosJson = await obtenerDatosUsuarios();
    const usuariosLocal = JSON.parse(localStorage.getItem('usuarios')) || [];
    const listaUsuarios = document.getElementById('listaUsuarios');
    const verTodosBtn = document.getElementById('verTodosBtn');
    const verMenosBtn = document.getElementById('verMenosBtn');

    listaUsuarios.innerHTML = '';

    const todosUsuarios = [...usuariosJson, ...usuariosLocal];


    const usuariosDefinidos = todosUsuarios.filter(usuario => usuario.nombreUsuario);


    const usuariosParaMostrar = mostrarTodos ? usuariosDefinidos : usuariosDefinidos.slice(0, 10);


    usuariosParaMostrar.forEach(usuario => {
        const listItem = document.createElement('li');
        listItem.textContent = `${usuario.nombreCompleto} // ${usuario.nombreUsuario}`;
        listaUsuarios.appendChild(listItem);
    });


    if (usuariosDefinidos.length > 10) {
        verTodosBtn.style.display = mostrarTodos ? 'none' : 'block';
        verMenosBtn.style.display = mostrarTodos ? 'block' : 'none';
    } else {
        verTodosBtn.style.display = 'none';
        verMenosBtn.style.display = 'none';
    }

    document.getElementById('seccionUsuarios').style.display = 'block';
}

function verTodosUsuarios() {
    mostrarTodos = true;
    mostrarUsuariosAdheridos();
}

function verMenosUsuarios() {
    mostrarTodos = false;
    mostrarUsuariosAdheridos();
}


function registrarUsuario(event) {
    event.preventDefault();

    const nombreCompletoInput = document.getElementById('nombreCompletoRegistrar');
    const usuarioInput = document.getElementById('usuarioRegistrar');
    const contrasenaInput = document.getElementById('contrasenaRegistrar');

    const nombreCompleto = nombreCompletoInput.value.trim();
    const usuario = usuarioInput.value.trim().toLowerCase();
    const contrasena = contrasenaInput.value.trim();

    if (nombreCompleto && usuario && contrasena) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push({ nombreCompleto: nombreCompleto, nombreUsuario: usuario, contrasena: contrasena });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        mostrarUsuariosAdheridos();

        Swal.fire({
            title: 'Éxito',
            text: 'Cuenta creada con éxito. Puedes iniciar sesión.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        nombreCompletoInput.value = '';
        usuarioInput.value = '';
        contrasenaInput.value = '';
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, complete todos los campos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}


function iniciarSesion(event) {
    event.preventDefault();

    const usuarioInput = document.getElementById('usuarioLogin');
    const contrasenaInput = document.getElementById('contrasenaLogin');

    const usuario = usuarioInput.value.trim().toLowerCase();
    const contrasena = contrasenaInput.value.trim();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(u => u.nombreUsuario === usuario && u.contrasena === contrasena);

    if (usuarioEncontrado) {
        usuarioActual = usuario;
        document.getElementById('seccionJuego').style.display = 'block';
        document.getElementById('mensajeBienvenida').style.display = 'block';
        document.getElementById('nombreUsuario').textContent = usuario;

        usuarioInput.value = '';
        contrasenaInput.value = '';

        Swal.fire({
            title: 'Bienvenido',
            text: `Has iniciado sesión correctamente como ${usuario}.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Nombre de usuario o contraseña incorrectos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}


function cerrarSesion() {
    usuarioActual = null;
    document.getElementById('seccionJuego').style.display = 'none';
    document.getElementById('mensajeBienvenida').style.display = 'none';

    Swal.fire({
        title: 'Éxito',
        text: 'Has cerrado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}


function eliminarUsuario(nombreUsuario) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(usuario => usuario.nombreUsuario !== nombreUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    Swal.fire({
        title: 'Éxito',
        text: 'Usuario eliminado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });

    mostrarUsuariosAdheridos();
}


function eliminarTodosUsuarios() {
    localStorage.clear();
    Swal.fire({
        title: 'Éxito',
        text: 'Todos los usuarios han sido eliminados.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });

    mostrarUsuariosAdheridos();
}


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
    mostrarUsuariosAdheridos();
    document.getElementById('formularioRegistrar').addEventListener('submit', registrarUsuario);
    document.getElementById('formularioLogin').addEventListener('submit', iniciarSesion);
    document.getElementById('botonCerrarSesion').addEventListener('click', cerrarSesion);
    document.getElementById('verTodosBtn').addEventListener('click', verTodosUsuarios);
    document.getElementById('verMenosBtn').addEventListener('click', verMenosUsuarios);


    const botonesJuego = document.querySelectorAll('.botonJuego');
    botonesJuego.forEach(boton => {
        boton.addEventListener('click', () => manejarJuego(boton.dataset.eleccion));
    });
});