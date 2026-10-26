let currentInput = "";

function appendInput(value) {
    currentInput += value;
    updateDisplay();
}

function clearAll() {
    currentInput = "";
    document.getElementById("result").innerText = "0";
    document.getElementById("expression").innerText = "";
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("expression").innerText = currentInput;
}

function calculateResult() {
    if (!currentInput) return;
    
    try {
        let sanitized = currentInput.replace(/×/g, "*").replace(/÷/g, "/");
        let evaluated = Function(`'use strict'; return (${sanitized})`)();
        
        if (typeof evaluated === "number" && !isNaN(evaluated)) {
            let resultStr = Number.isInteger(evaluated) ? 
                evaluated.toString() : evaluated.toFixed(6).replace(/\.?0+$/, "");
            
            document.getElementById("result").innerText = resultStr;
            currentInput = resultStr;
        } else {
            document.getElementById("result").innerText = "Error";
        }
    } catch (e) {
        document.getElementById("result").innerText = "Error";
    }
}