function operate(str) {
    [n1, op, n2] = str.split(" ");
    
    if (n2.includes("(")) {
        n2 = n2.split("").filter((digit) => !(digit === "(" || digit === ")"));
        n2 = n2.join("");
    }

    n1 = parseFloat(n1);
    n2 = parseFloat(n2);
    let result = 0;
    
    switch (op) {
        case "+":
            result = n1 + n2;
            break;
        case "-":
            result = n1 - n2;
            break;
        case "*":
            result = n1 * n2;
            break;
        case "/":
            result = n1 / n2;
            break;
    }

    if (result.toString().includes(".")) result = result.toFixed(2);

    if (result === Infinity || result === NaN) result = 0;

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
    getKey: function (key) {
        if (!isNaN(key) && this.op || (this.op && key === "." && !this.n2.includes("."))) {
            this.n2 += key;
            return;
        } else if (key === "C" || key === "CE") {
            this.n1 = "0";
            this.op = "";
            this.n2 = "";
            return;
        } else if (!isNaN(key) || (key === "." && !this.n1.includes("."))) {
            if (this.n1 === "0") this.n1 = "";
            this.n1 += key;
            return;
        } else if (key === "Del") {
            if (this.n2) {
                this.n2 = this.n2.slice(0, this.n2.length -1);
                return;
            } else if (this.op) {
                this.op = "";
                return;
            }

            this.n1 = this.n1.slice(0, this.n1.length -1);
            if (this.n1.length === 0) this.n1 = "0";
            return;
        }
        if (key === "+/-") {
            if (this.n2 && !this.n2.includes("-")) {
                if (this.op === "-") {
                    this.n2 = `(-${this.n2})`;
                    return;
                }

                this.n2 = `-${this.n2}`;
                return;
            } else if (this.n2.includes("-")) {
                this.n2 = this.n2.slice(1, this.n2.length);
                return;
            }

            if (this.n1.includes("-")) {
                this.n1 = this.n1.slice(1, this.n1.length);
                return;
            } else if (this.n1 === "0") return;
            
            this.n1 = `-${this.n1}`; 
            return;
        }

        if (this.op && this.n2 && key !== ".") this.getResult();

        if (key === ".") return;
        this.op = key;
    },
    getResult: function() {
        let result = 0;
        result = operate(`${displayText.n1} ${displayText.op} ${displayText.n2}`);
        this.n1 = result.toString();
        this.op = "";
        this.n2 = "";
    },
};

keys.addEventListener("click", (btn) => {
    let key = btn.target.textContent;

    if (key !== "=") displayText.getKey(key);
    if (key === "=") displayText.getResult();

    display.textContent = `${displayText.n1} ${displayText.op} ${displayText.n2}`;
});