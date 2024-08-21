
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioActual = null;

function registrarUsuario(event) {
    event.preventDefault(); 

    const usuarioInput = document.getElementById('usuarioRegistrar');
    const contrasenaInput = document.getElementById('contrasenaRegistrar');

    const usuario = usuarioInput.value.trim();
    const contrasena = contrasenaInput.value.trim();


    limpiarEstilos(usuarioInput, contrasenaInput);

    if (usuario && contrasena) {
     
        const usuarioExistente = usuarios.find(u => u.nombre === usuario);

        if (usuarioExistente) {
            aplicarEstiloError(usuarioInput);
            alert('El nombre de usuario ya está en uso.');
        } else {
           
            usuarios.push({ nombre: usuario, contrasena: contrasena });
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            aplicarEstiloExito(usuarioInput, contrasenaInput);
            alert('Cuenta creada con éxito. Puedes iniciar sesión.');
        }
    } else {
        if (!usuario) aplicarEstiloError(usuarioInput);
        if (!contrasena) aplicarEstiloError(contrasenaInput);
        alert('Por favor, complete todos los campos.');
    }
}

function iniciarSesion(event) {
    event.preventDefault(); 

    const usuarioInput = document.getElementById('usuarioLogin');
    const contrasenaInput = document.getElementById('contrasenaLogin');

    const usuario = usuarioInput.value.trim();
    const contrasena = contrasenaInput.value.trim();

   
    limpiarEstilos(usuarioInput, contrasenaInput);

    if (usuario && contrasena) {
       
        const usuarioValido = usuarios.find(u => u.nombre === usuario && u.contrasena === contrasena);

        if (usuarioValido) {
            aplicarEstiloExito(usuarioInput, contrasenaInput);
            alert('Inicio de sesión exitoso.');
            iniciarSesionUsuario(usuario);
        } else {
            aplicarEstiloError(usuarioInput, contrasenaInput);
            alert('Nombre de usuario o contraseña incorrectos.');
        }
    } else {
        if (!usuario) aplicarEstiloError(usuarioInput);
        if (!contrasena) aplicarEstiloError(contrasenaInput);
        alert('Por favor, complete todos los campos.');
    }
}

function cerrarSesion() {
    usuarioActual = null;
    document.getElementById('mensajeBienvenida').style.display = 'none';
    document.getElementById('seccionJuego').style.display = 'none';
    document.getElementById('resultado').textContent = '';
    alert('Sesión cerrada.');
}

function aplicarEstiloError(...inputs) {
    inputs.forEach(input => {
        input.classList.add('input-error');
    });
}

function aplicarEstiloExito(...inputs) {
    inputs.forEach(input => {
        input.classList.add('input-success');
    });
}

function limpiarEstilos(...inputs) {
    inputs.forEach(input => {
        input.classList.remove('input-error', 'input-success');
    });
}

function iniciarSesionUsuario(usuario) {
    usuarioActual = usuario;
    document.getElementById('mensajeBienvenida').style.display = 'block';
    document.getElementById('nombreUsuario').textContent = usuario;
    document.getElementById('seccionJuego').style.display = 'block';
}

document.getElementById('formularioRegistrar').addEventListener('submit', registrarUsuario);
document.getElementById('formularioLogin').addEventListener('submit', iniciarSesion);
document.getElementById('botonCerrarSesion').addEventListener('click', cerrarSesion);