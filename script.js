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
    let result = 0;
    
    switch (op) {
        case "+":
            result = add(n1, n2);
        case "-":
            result = subtract(n1, n2);
        case "*":
            result = multiply(n1, n2);
        case "/":
            result = divide(n1, n2);
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
        button.textContent = btn;

        keys.appendChild(button);
    }
}

createButtons();

const keys = document.querySelector("#keys");
const display = document.querySelector("#display");
let displayText = ["0", "",  ""];

keys.addEventListener("click", (btn) => {
    let key = btn.target.textContent;

    if (displayText[0] === "0") {
        displayText[0] = "";
    }

    if (!(key === "CE" || key === "C" || key === "Del" ||
        key === "+/-" || key === "=")) {

        if (key === "/" || key === "*" || key === "+" || key === "-") {
            displayText[1] = key;
        } else if (displayText[1]) {
            displayText[2] += key;
        } else if (!displayText[1]) {
            displayText[0] += key;
        }

    } else if (key === "CE" || key === "C") {
        displayText = ["0", "", ""];
    } else if (key === "Del") {

        if (displayText[2]) {
            displayText[2] = displayText[2].substring(0, displayText[2].length -1);
        } else if (displayText[1]) {
            displayText[1] = "";
        } else {
            displayText[0] = displayText[0].substring(0, displayText[0].length -1);

            displayText[0] = (displayText[0].length === 0) ? "0" : displayText[0];
        }
    } else if (key === "=" && displayText[2]) {
        display.textContent = operate(displayText.join(" "));
        displayText = ["0", "", ""];
        return;
    }

    display.textContent = displayText.join(" ");
});