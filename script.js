function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function operate(str) {
    [n1, op, n2] = str.split(" ");
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);
    let result = 0;
    
    switch (op) {
        case "+":
            result = add(n1, n2);
            break;
        case "-":
            result = subtract(n1, n2);
            break;
        case "*":
            result = multiply(n1, n2);
            break;
        case "/":
            result = divide(n1, n2);
            break;
    }

    return result;
}

function createButtons() {
    const buttons = ["CE", "C", "Del", "/", 
                     "7", "8", "9", "*", 
                     "4", "5", "6", "-", 
                     "1", "2", "3", "+", 
                     "+/-", "0", ".", "="];

    const keys = document.querySelector("#keys");

    for (const btn of buttons) {
        const button = document.createElement("button");
        button.setAttribute("class", "btn");
        if (isNaN(btn)) button.setAttribute("class", "btn highlight");

        button.textContent = btn;

        keys.appendChild(button);
    }
}

createButtons();

const keys = document.querySelector("#keys");
const display = document.querySelector("#display");
let displayText = {
    n1: "0",
    op: "",
    n2: "",
};

keys.addEventListener("click", (btn) => {
    let key = btn.target.textContent;
    let result = 0;

    if (!(key === "CE" || key === "C" || key === "Del" ||
        key === "+/-" || key === "=")) {

        if (key === "/" || key === "*" || key === "+" || key === "-") {
            if (displayText.n2) {
                result = operate(`${displayText.n1} ${displayText.op} ${displayText.n2}`);
                result = (result.toString().includes(".")) ? result.toFixed(2) : result;
        
                display.textContent = result;
                
                displayText.n1 = result.toString();
                displayText.op = key;
                displayText.n2 = "";
            }

            displayText.op = key;

        } else if (displayText.op) {
            if (key === "." && displayText.n2.includes(".")) return;

            displayText.n2 += key;

        } else if (!displayText.op) {
            if (key === "." && displayText.n1.includes(".")) return;

            displayText.n1 = (displayText.n1 === "0" && key != "0" ||
            displayText.n1 === "Infinity") ? "" : displayText.n1;

            displayText.n1 += key;
        }

    } else if (key === "CE" || key === "C") {
        displayText.n1 = "0";
        displayText.op = "";
        displayText.n2 = "";

    } else if (key === "+/-") {
        if (!(displayText.op && displayText.n1 === "0")) {
            displayText.n1 = "-" + displayText.n1;

        } else if (displayText.op && !displayText.n1 === "0") {
            displayText.n2 = "-" + displayText.n2;
        }

    } else if (key === "Del") {

        if (displayText.n2) {
            displayText.n2 = displayText.n2.substring(0, displayText.n2.length -1);

        } else if (displayText.op) {
            displayText.op = "";

        } else {
            displayText.n1 = (displayText.n1 === "Infinity") ? "0" : displayText.n1.substring(0, displayText.n1.length -1);

            displayText.n1 = (displayText.n1.length === 0) ? "0" : displayText.n1;
        }
    } else if (key === "=" && displayText.n2) {
        result = operate(`${displayText.n1} ${displayText.op} ${displayText.n2}`);
        result = (result.toString().includes(".")) ? result.toFixed(2) : result;

        display.textContent = result;
        
        displayText.n1 = result.toString();
        displayText.op = "";
        displayText.n2 = "";

        return;
    }

    display.textContent = `${displayText.n1} ${displayText.op} ${displayText.n2}`;
});