document.addEventListener('DOMContentLoaded', function() {
    const contadores = {};
    
    const items = document.querySelectorAll('.item');
    
    function actualizarTotal() {
        let total = 0;
        Object.keys(contadores).forEach(index => {
            const valorOriginal = parseInt(contadores[index].valorOriginal.replace(/\./g, ''));
            const contador = contadores[index].contador;
            total += valorOriginal * contador;
        });
        
        const totalFormateado = total.toLocaleString('es-CL');
        document.getElementById('total').textContent = totalFormateado;
    }
    
    items.forEach((item, index) => {
        const input = item.querySelector('input');
        const btnUp = item.querySelector('.btn-up');
        const btnDown = item.querySelector('.btn-down');
        
        const valorOriginal = input.value;
        const container = document.createElement('div');
        container.className = 'valor-container';
        container.innerHTML = `<span class="valor-principal">${valorOriginal}</span>`;
        
        input.parentNode.replaceChild(container, input);
        
        contadores[index] = {
            valorOriginal: valorOriginal,
            contador: 0
        };
        
        btnUp.addEventListener('click', function() {
            contadores[index].contador++;
            
            container.style.backgroundColor = '#F0F4C0';
            
            container.innerHTML = `
                <span class="valor-principal">${contadores[index].valorOriginal}</span>
                <span class="contador-text">x${contadores[index].contador}</span>
            `;
            
            actualizarTotal();
        });
        
        btnDown.addEventListener('click', function() {
            if (contadores[index].contador > 0) {
                contadores[index].contador--;
                
                if (contadores[index].contador === 0) {
                    container.style.backgroundColor = '';
                    container.innerHTML = `<span class="valor-principal">${contadores[index].valorOriginal}</span>`;
                } else {
                    container.innerHTML = `
                        <span class="valor-principal">${contadores[index].valorOriginal}</span>
                        <span class="contador-text">x${contadores[index].contador}</span>
                    `;
                }
                
                actualizarTotal();
            }
        });
    });
    
    actualizarTotal();

    const popup = document.getElementById('popup');
    const btnComprar = document.getElementById('btn-cargar');
    const btnCancelar = document.getElementById('btn-cancelar');
    const popupClose = document.getElementById('popup-close');

    popup.style.display = 'none';

    btnComprar.addEventListener('click', function() {
        popup.style.display = 'flex';
    });

    popupClose.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    btnCancelar.addEventListener('click', function() {
        Object.keys(contadores).forEach(index => {
            contadores[index].contador = 0;
            
            const item = items[index];
            const container = item.querySelector('.valor-container');
            
            container.style.backgroundColor = '';
            container.innerHTML = `<span class="valor-principal">${contadores[index].valorOriginal}</span>`;
        });
        
        actualizarTotal();
    });
});