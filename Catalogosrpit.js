document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = localStorage.getItem('usuarioActual');
    const rolActual = localStorage.getItem('rolActual');
    const galeria = document.getElementById('galeria');
    const btnSubirFoto = document.getElementById('btnSubirFoto');
    const inputFoto = document.getElementById('inputFoto');
    const mensajeCatalogo = document.getElementById('mensajeCatalogo');

    let fotos = JSON.parse(localStorage.getItem('fotos')) || [];

    function mostrarFotos() {
      galeria.innerHTML = fotos.map((src, i) => `
        <div class="foto-item">
          <img src="${src}" alt="Foto ${i+1}" width="200" />
          ${rolActual === 'admin' ? `<button data-index="${i}" class="btnEliminarFoto">Eliminar</button>` : ''}
        </div>
      `).join('');
      
      if (rolActual === 'admin') {
        document.querySelectorAll('.btnEliminarFoto').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            fotos.splice(index, 1);
            localStorage.setItem('fotos', JSON.stringify(fotos));
            mostrarFotos();
          });
        });
      }
    }

    if (rolActual === 'admin') {
      btnSubirFoto.style.display = 'inline-block';
      btnSubirFoto.addEventListener('click', () => {
        inputFoto.click();
      });

      inputFoto.addEventListener('change', () => {
        const file = inputFoto.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
          fotos.push(e.target.result);
          localStorage.setItem('fotos', JSON.stringify(fotos));
          mostrarFotos();
        };
        reader.readAsDataURL(file);
      });
    } else if (rolActual === 'cliente') {
      mensajeCatalogo.textContent = 'Visualiza nuestro catálogo. Inicia sesión como admin para modificar.';
    } else {
      mensajeCatalogo.textContent = 'Debes iniciar sesión para ver el catálogo.';
      galeria.style.display = 'none';
      btnSubirFoto.style.display = 'none';
    }

    mostrarFotos();
  });