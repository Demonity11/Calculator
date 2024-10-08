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

function operate(op, n1, n2) {

}

function createButtons() {
    const buttons = ["CE", "C", "Del", "/", 
                     "7", "8", "9", "*", 
                     "4", "5", "6", "-", 
                     "1", "2", "3", "+", 
                     "+/-", "0", ".", "="];

    const container = document.querySelector(".container");

    for (const btn of buttons) {
        const button = document.createElement("button");
        button.setAttribute("class", "btn");
        button.textContent = btn;

        container.appendChild(button);
    }
}

createButtons();