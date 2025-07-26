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