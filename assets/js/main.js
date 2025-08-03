document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.item-2');
    const totalElement = document.getElementById('total');

    const btnCancelar = document.getElementById('btn-cancelar');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', function() {
            items.forEach(item => {
                const valorElement = item.querySelector('.valor');
                if (valorElement) {
                    valorElement.textContent = '0';
                }
                const input = item.querySelector('input[type="text"]');
                if (input) {
                    input.style.backgroundColor = '';
                }
            });
            calculateTotal();
        });
    }

    const btnCargar = document.getElementById('btn-cargar');
    const popup = document.getElementById('popup');
    if (btnCargar && popup) {
        btnCargar.addEventListener('click', function() {
            popup.style.display = 'block';
        });
    }

    const popupClose = document.getElementById('popup-close');
    if (popupClose && popup) {
        popupClose.addEventListener('click', function() {
            popup.style.display = 'none';
        });
    }

    function calculateTotal() {
        let total = 0;
        items.forEach(item => {
            const input = item.querySelector('input[type="text"]');
            const valorElement = item.querySelector('.valor');
            if (input && valorElement) {
                const inputValue = parseInt(input.value.replace(/\./g, '')) || 0;
                const quantity = parseInt(valorElement.textContent) || 0;
                total += inputValue * quantity;
            }
        });
        if (totalElement) {
            totalElement.textContent = total.toLocaleString('es-CL');
        }
    }

    items.forEach(item => {
        const btnRight = item.querySelector('.btn-right');
        const btnLeft = item.querySelector('.btn-left');
        const input = item.querySelector('input[type="text"]');
        const valorElement = item.querySelector('.valor');
        function updateInputColor(value) {
            if (input) {
                if (value === 0) {
                    input.style.backgroundColor = '';
                } else {
                    input.style.backgroundColor = '#F0F4C0';
                }
            }
        }
        if (btnRight) {
            btnRight.addEventListener('click', function() {
                if (valorElement) {
                    let currentValue = parseInt(valorElement.textContent) || 0;
                    currentValue++;
                    valorElement.textContent = currentValue;
                    updateInputColor(currentValue);
                    calculateTotal();
                }
            });
        }
        if (btnLeft) {
            btnLeft.addEventListener('click', function() {
                if (valorElement) {
                    let currentValue = parseInt(valorElement.textContent) || 0;
                    if (currentValue > 0) {
                        currentValue--;
                    }
                    valorElement.textContent = currentValue;
                    updateInputColor(currentValue);
                    calculateTotal();
                }
            });
        }
    });
    calculateTotal();
});

// Sistema de popup genérico simplificado
// Definimos las funciones fuera del evento DOMContentLoaded para que sean accesibles globalmente

// Configuraciones predefinidas de popups
const POPUP_CONFIGS = {
  imprimiendo: {
    titulo: "Imprimiendo...",
    icono: "assets/img/icon-print.png",
    mensaje: "Por favor espera mientras se imprimen tus cupones",
    mostrarTitulo: true,
    mostrarIcono: true
  },
  datosIncorrectos: {
    titulo: "Datos incorrectos",
    icono: "assets/img/icon-datos-incorrectos.png",
    mensaje: "Debe dirigirse a una oficina enjoy club para actualizar sus datos",
    mostrarTitulo: true,
    mostrarIcono: true
  },
  error: {
    titulo: "Error",
    icono: "assets/img/icon-error.png",
    mensaje: "Ha ocurrido un error inesperado",
    mostrarTitulo: true,
    mostrarIcono: true
  },
  soloMensaje: {
    mensaje: "Mensaje simple sin título ni icono",
    mostrarTitulo: false,
    mostrarIcono: false
  }
};

function mostrarPopup(config) {
  const messageDiv = document.querySelector(".message");
  if (!messageDiv) return;

  const messageContent = messageDiv.querySelector(".message-content");
  if (!messageContent) return;

  // Limpiar contenido anterior
  messageContent.innerHTML = "";

  // Botón de cerrar (siempre presente)
  const btnClose = document.createElement("span");
  btnClose.className = "btn-close";
  btnClose.innerHTML = '<img src="assets/img/btn-close.svg">'; // Corregido para usar la ruta correcta
  messageContent.appendChild(btnClose);

  // Agregar icono si está configurado
  if (config.mostrarIcono && config.icono) {
    const icono = document.createElement("img");
    icono.src = config.icono;
    icono.alt = "Icono";
    messageContent.appendChild(icono);
  }

  // Agregar título si está configurado
  if (config.mostrarTitulo && config.titulo) {
    const titulo = document.createElement("h2");
    titulo.textContent = config.titulo;
    messageContent.appendChild(titulo);
  }

  // Agregar mensaje
  const mensaje = document.createElement("p");
  mensaje.textContent = config.mensaje;
  messageContent.appendChild(mensaje);

  // Mostrar popup
  messageDiv.style.display = "flex";
  messageDiv.classList.add("show");

  // Agregar event listener al botón de cerrar
  btnClose.addEventListener("click", ocultarPopup);
}

function ocultarPopup() {
  const messageDiv = document.querySelector(".message");
  if (messageDiv) {
    messageDiv.style.display = "none";
    messageDiv.classList.remove("show");
  }
}

// Función para mostrar popup usando configuración predefinida
function mostrarPopupPredefinido(tipo) {
  if (POPUP_CONFIGS[tipo]) {
    mostrarPopup(POPUP_CONFIGS[tipo]);
  }
}

// Exponer las funciones globalmente
window.PopupManager = {
  mostrarPredefinido: mostrarPopupPredefinido,
  ocultar: ocultarPopup
};

document.addEventListener("DOMContentLoaded", function () {
  // Event listeners para elementos existentes
  const btnPrint = document.getElementById("btn-print-cupones");
  if (btnPrint) {
    btnPrint.addEventListener("click", function (e) {
      e.preventDefault();
      mostrarPopupPredefinido('imprimiendo');
    });
  }

  // Event listener para cerrar popup al hacer clic fuera
  document.addEventListener('click', function(e) {
    const messageDiv = document.querySelector(".message");
    if (e.target === messageDiv) {
      ocultarPopup();
    }
  });
});