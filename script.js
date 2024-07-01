document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    
    let currentInput = "0";
    let operator = null;
    let previousInput = null;
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");
            handleInput(value);
        });
    });
    
    function handleInput(value) {
        if (!isNaN(value) || value === ".") {
            handleNumber(value);
        } else if (value === "C") {
            clearDisplay();
        } else if (value === "=") {
            calculateResult();
        } else {
            handleOperator(value);
        }
        updateDisplay();
    }
    
    function handleNumber(value) {
        if (currentInput === "0" && value !== ".") {
            currentInput = value;
        } else if (value === "." && currentInput.includes(".")) {
            return;
        } else {
            currentInput += value;
        }
    }
    
    function clearDisplay() {
        currentInput = "0";
        operator = null;
        previousInput = null;
    }
    
    function calculateResult() {
        if (operator && previousInput !== null) {
            currentInput = String(operate(Number(previousInput), Number(currentInput), operator));
            operator = null;
            previousInput = null;
        }
    }
    
    function handleOperator(value) {
        if (previousInput === null) {
            previousInput = currentInput;
        } else if (operator) {
            currentInput = String(operate(Number(previousInput), Number(currentInput), operator));
        }
        currentInput = "0";
        operator = value;
    }
    
    function operate(num1, num2, operator) {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                return num2 !== 0 ? num1 / num2 : "Error";
            default:
                return num1;
        }
    }
    
    function updateDisplay() {
        display.textContent = currentInput;
    }
});
