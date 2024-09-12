const numbers = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  π: Math.PI.toString(),
  ".": ".",
};

const operators = {
  "+": "add",
  "-": "subtract",
  "×": "multiply",
  "÷": "divide",
  "%": "modulus",
  "^": "power",
  "√": "sqrt",
};

const parentheses = {
  "(": "(",
  ")": ")",
};

const controls = {
  C: "clear",
  "←": "backspace",
  "=": "equals",
};

const buttons = document.querySelectorAll(".button");
const upperDisplay = document.querySelector("#display-upper");
const lowerDisplay = document.querySelector("#display-lower");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.textContent;

    if (numbers[value]) {
      // Handle numbers and add to display
      lowerDisplay.value = value;
    } else if (operators[value]) {
      // Handle operations
    } else if (parentheses[value]) {
      // Handle parentheses
    } else if (controls[value]) {
      // Handle special control actions like clear, backspace, equals, etc.
    }
  });
});

function add(num1, num2) {
  return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
  return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
  return Number(num1) * Number(num2);
}

function divide(num1, num2) {
  return Number(num1) / Number(num2);
}

function modulus(num1, num2) {
  return Number(num1) % Number(num2);
}

function power(base, exponene) {
  return Math.pow(Number(base), Number(exponent));
}
