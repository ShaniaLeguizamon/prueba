// Variables UI
const modalFondo = document.getElementById('modalFondo');
const modalLogin = document.getElementById('login');
const btnCerrarLogin = document.getElementById('cerrarLogin');
const btnLogin = document.getElementById('btnLogin');
const loginForm = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');
const rolSelect = document.getElementById('rol');
const usuarioInput = document.getElementById('usuario');
const passwordInput = document.getElementById('password');
const usuarioInfo = document.getElementById('usuarioInfo');

// Estado inicial
let usuarioActual = localStorage.getItem('usuarioActual') || null;
let rolActual = localStorage.getItem('rolActual') || 'invitado';

// Mostrar modal login
function abrirModalLogin() {
  modalFondo.style.display = 'block';
  modalLogin.style.display = 'block';
  mensaje.textContent = '';
  loginForm.reset();
}

// Cerrar modal login
function cerrarModalLogin() {
  modalFondo.style.display = 'none';
  modalLogin.style.display = 'none';
}

// Actualizar interfaz según rol
function actualizarInterfazSegunRol() {
  if (rolActual === 'invitado') {
    btnLogin.innerHTML = `<i class="fas fa-sign-in-alt"></i>`;
    usuarioInfo.textContent = '';
  } else {
    btnLogin.innerHTML = `<i class="fas fa-sign-out-alt"></i>`;
    usuarioInfo.textContent = `${usuarioActual} (${rolActual.charAt(0).toUpperCase() + rolActual.slice(1)})`;
  }
}

// Evento login/logout
btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  if (rolActual === 'invitado') {
    abrirModalLogin();
  } else {
    // Cerrar sesión
    usuarioActual = null;
    rolActual = 'invitado';
    localStorage.removeItem('usuarioActual');
    localStorage.removeItem('rolActual');
    actualizarInterfazSegunRol();
  }
});

// Cerrar modal login
btnCerrarLogin.addEventListener('click', cerrarModalLogin);
modalFondo.addEventListener('click', cerrarModalLogin);

// Formulario login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const usuario = usuarioInput.value.trim();
  const password = passwordInput.value.trim();
  const rol = rolSelect.value;

  if (!usuario || !password || !rol) {
    mensaje.textContent = 'Por favor, complete todos los campos.';
    return;
  }

  // Aquí deberías validar credenciales, pero para demo aceptamos cualquiera

  usuarioActual = usuario;
  rolActual = rol;

  localStorage.setItem('usuarioActual', usuarioActual);
  localStorage.setItem('rolActual', rolActual);

  cerrarModalLogin();
  actualizarInterfazSegunRol();

  // Ya no redirecciona automáticamente
  alert(`Sesión iniciada como ${rolActual}. Ahora puedes navegar manualmente.`);
});
//login compratido
document.addEventListener('DOMContentLoaded', () => {
  const usuarioInfo = document.getElementById('usuarioInfo');
  const btnLogin = document.getElementById('btnLogin');

  const usuarioActual = localStorage.getItem('usuarioActual');
  const rolActual = localStorage.getItem('rolActual');

  if (usuarioActual && rolActual && usuarioInfo && btnLogin) {
    btnLogin.innerHTML = `<i class="fas fa-sign-out-alt"></i>`;
    usuarioInfo.textContent = `${usuarioActual} (${rolActual.charAt(0).toUpperCase() + rolActual.slice(1)})`;
  }
});