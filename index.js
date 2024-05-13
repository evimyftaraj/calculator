let firstNum = ''
let secondNum = ''
let currentOperation = null;
let shouldResetScreen = false;


const numberBtn = document.querySelectorAll("[data-number]");
const equationBtn = document.querySelectorAll("[data-operator]");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const pointBtn = document.getElementById("point-btn");
const equalsBtn = document.getElementById("equals-btn");
const topScreen = document.getElementById("top-part");
const lastScreen = document.getElementById("last-screen");

equalsBtn.addEventListener('click', evaluate)
clearBtn.addEventListener('click', clear)
deleteBtn.addEventListener('click', deleteNumber)
pointBtn.addEventListener('click', appendPoint)

numberBtn.forEach((button) => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent)
    })
});

equationBtn.forEach((button) => {
    button.addEventListener('click', () => {
        setOperation(button.textContent)
    })
});

function appendNumber(number) {
    if (topScreen.textContent === '0' || shouldResetScreen) {
        reset();
    }
    topScreen.textContent += number; 
}

function reset() {
    topScreen.textContent = ''
    shouldResetScreen = false
};

function clear() {
    topScreen.textContent = '0'
    lastScreen.textContent = ''
    firstNum = ''
    secondNum = ''
    currentOperation = null
};

function appendPoint() {
    if (shouldResetScreen) {
        reset();
    } 
    if (topScreen.textContent === '') {
        topScreen.textContent = '0'
    }
    if (topScreen.textContent.includes('.')) {
        return topScreen.textContent += '.'
    }
};

function deleteNumber() {
    topScreen.textContent = topScreen.textContent
                                                .toString()
                                                .slice(0, -1)
}

function setOperation(operator) {
    if (currentOperation !== null) {
        evaluate() 
    }
    firstNum = topScreen.textContent;
    currentOperation = operator
    lastScreen.textContent = `${firstNum} ${currentOperation}`
    shouldResetScreen = true
};

function evaluate() {
    if (currentOperation === null || shouldResetScreen) {
        return
    } else if (currentOperation === "÷" && topScreen.textContent === '0') {
        alert("can't divide by 0!")
        return;
    }
    secondNum = topScreen.textContent
    topScreen.textContent = roundResult(
        operate(currentOperation, firstNum, secondNum)
    )
    lastScreen.textContent = `${firstNum} ${currentOperation} ${secondNum} =`
    currentOperation = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function add(a, b) {
    return a + b
};

function subtract(a, b) {
    return a - b
};

function multiply(a, b) {
    return a * b
};

function divide(a, b) {
    return a / b
};

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case 'x':
            return multiply(a, b)
        case '÷':
            if (b === 0) {
                return null
            } else {
                return divide(a, b)
            }
        default: 
            return null;
    }
}