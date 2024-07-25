document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let displayValue = '0';
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const { action, value } = button.dataset;
            if (action === 'number') {
                inputNumber(value);
            } else if (action === 'decimal') {
                inputDecimal();
            } else if (action === 'clear') {
                clearDisplay();
            } else if (action === 'delete') {
                deleteLastDigit();
            } else if (action === 'operation') {
                handleOperator(value);
            } else if (action === 'equals') {
                calculate();
            }
            updateDisplay();
        });
    });

    function inputNumber(num) {
        if (waitingForSecondValue) {
            displayValue = num;
            waitingForSecondValue = false;
        } else {
            displayValue = displayValue === '0' ? num : displayValue + num;
        }
    }

    function inputDecimal() {
        if (!displayValue.includes('.')) {
            displayValue += '.';
        }
    }

    function clearDisplay() {
        displayValue = '0';
        firstValue = null;
        operator = null;
        waitingForSecondValue = false;
    }

    function deleteLastDigit() {
        displayValue = displayValue.slice(0, -1) || '0';
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(displayValue);

        if (operator && waitingForSecondValue) {
            operator = nextOperator;
            return;
        }

        if (firstValue === null) {
            firstValue = inputValue;
        } else if (operator) {
            const result = performCalculation(firstValue, inputValue, operator);
            displayValue = `${parseFloat(result.toFixed(7))}`;
            firstValue = result;
        }

        waitingForSecondValue = true;
        operator = nextOperator;
    }

    function performCalculation(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    }

    function calculate() {
        const inputValue = parseFloat(displayValue);

        if (operator && !waitingForSecondValue) {
            displayValue = `${performCalculation(firstValue, inputValue, operator)}`;
            firstValue = null;
            operator = null;
            waitingForSecondValue = false;
        }
    }

    function updateDisplay() {
        display.textContent = displayValue;
    }
});
