function enviarWhatsApp(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    const mensaje = `Hola, soy ${nombre}. Quiero agendar una sesión para el ${fecha} a las ${hora}.`;
    const telefono = "573133159925";

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  }
document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = localStorage.getItem('usuarioActual');
    const rolActual = localStorage.getItem('rolActual');
    const agendaForm = document.getElementById('agendaForm');
    const mensajeAgenda = document.getElementById('mensajeAgenda');
    
    if (!usuarioActual || (rolActual !== 'cliente' && rolActual !== 'admin')) {
      agendaForm.style.display = 'none';
      mensajeAgenda.textContent = 'Debes iniciar sesión como cliente o admin para reservar.';
      mensajeAgenda.style.color = 'red';
    } else {
      agendaForm.style.display = 'block';
      
      agendaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        // Aquí podrías enviar a backend o abrir WhatsApp, etc.
        alert(`Sesión agendada para ${nombre} el ${fecha} a las ${hora}`);
        agendaForm.reset();
      });
    }
  });
