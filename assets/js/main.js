document.addEventListener('DOMContentLoaded', function() {
    // Objeto para mantener el contador de cada input
    const contadores = {};
    
    // Obtener todos los items de la grilla
    const items = document.querySelectorAll('.item');
    
    // Función para calcular y actualizar el total
    function actualizarTotal() {
        let total = 0;
        Object.keys(contadores).forEach(index => {
            const valorOriginal = parseInt(contadores[index].valorOriginal.replace(/\./g, ''));
            const contador = contadores[index].contador;
            total += valorOriginal * contador;
        });
        
        // Formatear el total con puntos de miles
        const totalFormateado = total.toLocaleString('es-CL');
        document.getElementById('total').textContent = totalFormateado;
    }
    
    items.forEach((item, index) => {
        const input = item.querySelector('input');
        const btnUp = item.querySelector('.btn-up');
        const btnDown = item.querySelector('.btn-down');
        
        // Reemplazar input con div container
        const valorOriginal = input.value;
        const container = document.createElement('div');
        container.className = 'valor-container';
        container.innerHTML = `<span class="valor-principal">${valorOriginal}</span>`;
        
        // Reemplazar el input con el container
        input.parentNode.replaceChild(container, input);
        
        // Inicializar contador para este item
        contadores[index] = {
            valorOriginal: valorOriginal,
            contador: 0
        };
        
        // Event listener para botón hacia arriba
        btnUp.addEventListener('click', function() {
            contadores[index].contador++;
            
            // Cambiar color del container
            container.style.backgroundColor = '#F0F4C0';
            
            // Actualizar el contenido con valor y contador
            container.innerHTML = `
                <span class="valor-principal">${contadores[index].valorOriginal}</span>
                <span class="contador-text">x${contadores[index].contador}</span>
            `;
            
            // Actualizar el total
            actualizarTotal();
        });
        
        // Event listener para botón hacia abajo
        btnDown.addEventListener('click', function() {
            if (contadores[index].contador > 0) {
                contadores[index].contador--;
                
                if (contadores[index].contador === 0) {
                    // Restaurar color original
                    container.style.backgroundColor = '';
                    container.innerHTML = `<span class="valor-principal">${contadores[index].valorOriginal}</span>`;
                } else {
                    // Mantener color y actualizar contador
                    container.innerHTML = `
                        <span class="valor-principal">${contadores[index].valorOriginal}</span>
                        <span class="contador-text">x${contadores[index].contador}</span>
                    `;
                }
                
                // Actualizar el total
                actualizarTotal();
            }
        });
    });
    
    // Inicializar el total en 0
    actualizarTotal();
});