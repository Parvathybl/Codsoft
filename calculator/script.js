document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let firstValue = '';
    let secondValue = '';
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                resetCalculator();
            } else if (value === '=') {
                if (firstValue && operator && currentInput) {
                    secondValue = currentInput;
                    const result = calculate(firstValue, secondValue, operator);
                    display.textContent = result;
                    firstValue = result;
                    secondValue = '';
                    operator = '';
                    currentInput = '';
                    shouldResetDisplay = true;
                }
            } else if (value === 'back') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else if (button.classList.contains('operator')) {
                if (currentInput === '' && display.textContent !== '0') {
                    operator = value;
                    firstValue = display.textContent;
                    display.textContent += ` ${operator} `;
                } else if (currentInput !== '') {
                    if (firstValue === '') {
                        firstValue = currentInput;
                    } else {
                        secondValue = currentInput;
                        const result = calculate(firstValue, secondValue, operator);
                        display.textContent = result;
                        firstValue = result;
                        secondValue = '';
                    }
                    operator = value;
                    display.textContent += ` ${operator} `;
                    currentInput = '';
                    shouldResetDisplay = true;
                }
            } else {
                if (shouldResetDisplay) {
                    currentInput = '';
                    shouldResetDisplay = false;
                }
                if (value === '.' && currentInput.includes('.')) return;
                if (value === '.' && currentInput === '') {
                    currentInput = '0';
                    display.textContent = '0';
                } else if (display.textContent === '0') {
                    display.textContent = '';
                }
                currentInput += value;
                display.textContent += value;
            }
        });
    });

    function resetCalculator() {
        currentInput = '';
        operator = '';
        firstValue = '';
        secondValue = '';
        display.textContent = '0';
        shouldResetDisplay = false;
    }

    function calculate(a, b, operator) {
        let result = 0;
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                if (b === 0) {
                    result = 'Error'; 
                } else {
                    result = a / b;
                }
                break;
        }
        return result.toString();
    }
});
