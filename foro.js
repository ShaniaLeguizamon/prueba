document.addEventListener('DOMContentLoaded', () => {
  // Elementos HTML
  const comentariosDiv = document.getElementById('comentarios');
  const comentarioInput = document.getElementById('comentarioInput');
  const btnPublicarComentario = document.getElementById('btnPublicarComentario');

  const blogEntradasDiv = document.getElementById('blogEntradas');
  const entradaInput = document.getElementById('entradaInput');
  const btnPublicarEntrada = document.getElementById('btnPublicarEntrada');

  // Obtener datos de usuario y rol
  const usuarioActual = localStorage.getItem('usuarioActual') || 'Anónimo';
  const rolActual = localStorage.getItem('rolActual') || 'invitado';

  // Cargar arrays o crear vacíos
  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
  let entradas = JSON.parse(localStorage.getItem('entradas')) || [];

  // Mostrar comentarios
  function mostrarComentarios() {
    comentariosDiv.innerHTML = '';
    comentarios.forEach((comentario, index) => {
      const div = document.createElement('div');
      div.className = 'comentario';
      div.innerHTML = `<strong>${comentario.usuario}:</strong> ${comentario.texto}`;

      // Solo admin puede editar/eliminar comentarios
      if (rolActual === 'admin') {
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => {
          const nuevoTexto = prompt('Editar comentario:', comentario.texto);
          if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
            comentarios[index].texto = nuevoTexto.trim();
            guardarComentarios();
            mostrarComentarios();
          }
        };

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => {
          if (confirm('¿Eliminar este comentario?')) {
            comentarios.splice(index, 1);
            guardarComentarios();
            mostrarComentarios();
          }
        };

        div.appendChild(btnEditar);
        div.appendChild(btnEliminar);
      }

      comentariosDiv.appendChild(div);
    });
  }

  // Mostrar entradas blog
  function mostrarEntradas() {
    blogEntradasDiv.innerHTML = '';
    entradas.forEach((entrada, index) => {
      const div = document.createElement('div');
      div.className = 'entrada';
      div.innerHTML = `<h3>${entrada.titulo}</h3><p>${entrada.contenido}</p>`;

      // Admin puede editar/eliminar entradas
      if (rolActual === 'admin') {
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => {
          const nuevoTitulo = prompt('Editar título:', entrada.titulo);
          const nuevoContenido = prompt('Editar contenido:', entrada.contenido);
          if (
            nuevoTitulo !== null && nuevoTitulo.trim() !== '' &&
            nuevoContenido !== null && nuevoContenido.trim() !== ''
          ) {
            entradas[index] = { titulo: nuevoTitulo.trim(), contenido: nuevoContenido.trim() };
            guardarEntradas();
            mostrarEntradas();
          }
        };

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => {
          if (confirm('¿Eliminar esta entrada?')) {
            entradas.splice(index, 1);
            guardarEntradas();
            mostrarEntradas();
          }
        };

        div.appendChild(btnEditar);
        div.appendChild(btnEliminar);
      }

      blogEntradasDiv.appendChild(div);
    });
  }

  // Guardar en localStorage
  function guardarComentarios() {
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
  }

  function guardarEntradas() {
    localStorage.setItem('entradas', JSON.stringify(entradas));
  }

  // Publicar nuevo comentario
  btnPublicarComentario.addEventListener('click', () => {
    const texto = comentarioInput.value.trim();
    if (texto === '') {
      alert('Escribe un comentario antes de publicar.');
      return;
    }

    if (rolActual === 'invitado') {
      alert('Debes iniciar sesión para comentar.');
      return;
    }

    comentarios.push({ usuario: usuarioActual, texto });
    guardarComentarios();
    mostrarComentarios();
    comentarioInput.value = '';
  });

  // Publicar nueva entrada (solo admin)
  if (rolActual === 'admin') {
    btnPublicarEntrada.addEventListener('click', () => {
      const titulo = entradaInput.value.trim();
      const contenido = prompt('Contenido de la entrada:');
      if (!titulo || !contenido) {
        alert('Debes escribir título y contenido para la entrada.');
        return;
      }

      entradas.push({ titulo, contenido });
      guardarEntradas();
      mostrarEntradas();
      entradaInput.value = '';
    });
  } else {
    // Ocultar formulario para publicar entrada si no es admin
    if (entradaInput) entradaInput.style.display = 'none';
    if (btnPublicarEntrada) btnPublicarEntrada.style.display = 'none';
  }

  // Inicializar vista
  mostrarComentarios();
  mostrarEntradas();
});
 // Foto input listener
 const photoInput = document.getElementById("photoInput");
 if (photoInput) {
   photoInput.addEventListener("change", function () {
     const file = photoInput.files[0];
     const reader = new FileReader();
     reader.onloadend = function () {
       sessionStorage.setItem("photoData", reader.result);
     };
     if (file) {
       reader.readAsDataURL(file);
     }
   });
 }
