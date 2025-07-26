document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos item-2
    const items = document.querySelectorAll('.item-2');
    const totalElement = document.getElementById('total');
    
    // Función para calcular el total
    function calculateTotal() {
        let total = 0;
        
        items.forEach(item => {
            const input = item.querySelector('input[type="text"]');
            const valorElement = item.querySelector('.valor');
            
            if (input && valorElement) {
                // Obtener el valor del input (remover puntos y convertir a número)
                const inputValue = parseInt(input.value.replace(/\./g, '')) || 0;
                // Obtener la cantidad seleccionada
                const quantity = parseInt(valorElement.textContent) || 0;
                // Sumar al total
                total += inputValue * quantity;
            }
        });
        
        // Actualizar el elemento total con formato de puntos
        if (totalElement) {
            totalElement.textContent = total.toLocaleString('es-CL');
        }
    }
    
    items.forEach(item => {
        const btnRight = item.querySelector('.btn-right');
        const btnLeft = item.querySelector('.btn-left');
        const input = item.querySelector('input[type="text"]');
        const valorElement = item.querySelector('.valor');
        
        // Función para actualizar el color del input
        function updateInputColor(value) {
            if (input) {
                if (value === 0) {
                    input.style.backgroundColor = ''; // Quitar el color cuando sea 0
                } else {
                    input.style.backgroundColor = '#F0F4C0';
                }
            }
        }
        
        // Event listener para el botón derecho (incrementar)
        if (btnRight) {
            btnRight.addEventListener('click', function() {
                if (valorElement) {
                    let currentValue = parseInt(valorElement.textContent) || 0;
                    currentValue++;
                    valorElement.textContent = currentValue;
                    updateInputColor(currentValue);
                    calculateTotal(); // Recalcular total
                }
            });
        }
        
        // Event listener para el botón izquierdo (decrementar)
        if (btnLeft) {
            btnLeft.addEventListener('click', function() {
                if (valorElement) {
                    let currentValue = parseInt(valorElement.textContent) || 0;
                    if (currentValue > 0) {
                        currentValue--;
                    }
                    valorElement.textContent = currentValue;
                    updateInputColor(currentValue);
                    calculateTotal(); // Recalcular total
                }
            });
        }
    });
    
    // Calcular total inicial
    calculateTotal();
});