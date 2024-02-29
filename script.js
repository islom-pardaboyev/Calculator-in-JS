let runningTotal = 0;
let buffer = '0';
let previousOperator = null;

const screen = document.querySelector('.screen');

const operations = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '×': (x, y) => x * y,
  '÷': (x, y) => x / y,
};

function buttonClick(value) {
    if (!isNaN(parseFloat(value)) || value === '.') {
        handleNumber(value);
    } else {
        handleSymbol(value);
    }
    screen.innerText = buffer;
}


function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            clear();
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            runningTotal = flushOperation();
            previousOperator = null;
            buffer = runningTotal.toString();
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            previousOperator = symbol;
            break;
    }
}

function handleMath() {
    if (buffer === '0' || buffer === 'Error') {
        return;
    }

    const intBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        runningTotal = flushOperation(intBuffer);
    }
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === null) {
        return runningTotal;
    }
    runningTotal = operations[previousOperator](runningTotal, intBuffer);
    return runningTotal;
}

function handleNumber(numberString) {
    if (buffer === '0' || buffer === 'Error') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function clear() {
    buffer = '0';
    runningTotal = 0;
    previousOperator = null;
}

function init() {
    const buttons = document.querySelectorAll('.calc-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttonClick(this.innerText);
        });
    });
}

init();