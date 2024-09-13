const numbers = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "π": Math.PI.toString(),
  ".": ".",
};

const operations = {
  "+": add,
  "-": subtract,
  "×": multiply,
  "÷": divide,
  "%": modulus,
  "^": power,
  "√": sqrt,
};

const parentheses = {
  "(": "(",
  ")": ")",
};

const controls = {
  "AC": clear,
  "←": backspace,
  "=": equals,
};

let firstNumber = "";
let secondNumber = "";
let operator = "";

const buttons = document.querySelectorAll(".button");
const upperDisplay = document.querySelector("#display-upper");
const lowerDisplay = document.querySelector("#display-lower");

function handleNumberInput(value) {
  if (operator === "") {
    firstNumber += value;
  } else {
    secondNumber += value;
  }
  showDisplay();
}

function handleOperatorInput(value) {
  if (operator === "") {
    operator = value;
  } else {
    showResult();
    operator = value;
  }
  showDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.textContent;

    if (numbers[value]) {
      handleNumberInput(value);
    } else if (operations[value]) {
      handleOperatorInput(value);
    } else if (parentheses[value]) {
      // Handle parentheses
    } else if (controls[value]) {
      controls[value]();
    }
  });
});

function add(num1, num2) {
  return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
  return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
  return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
  return parseFloat(num1) / parseFloat(num2);
}

function modulus(num1, num2) {
  return parseFloat(num1) % parseFloat(num2);
}

function power(base, exponent) {
  return Math.pow(parseFloat(base), parseFloat(exponent));
}

function operate(num1, num2, operator) {
  if (operations[operator]) {
    return operations[operator](num1, num2);
  }
}

function showDisplay() {
  lowerDisplay.value = firstNumber + operator + secondNumber;
}

function showResult() {
  const result = operate(firstNumber, secondNumber, operator);
  upperDisplay.value =
    firstNumber + operator + secondNumber + " = " + result.toString();
  // Reset firstNumber to result and prepare for the next operation
  firstNumber = result.toString();
  secondNumber = ""; // Clear secondNumber
  lowerDisplay.value = firstNumber;
}

function clear() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  upperDisplay.value = "";
  lowerDisplay.value = "";
}

function equals() {
  if ((firstNumber === "") | (secondNumber === "") | (operator === "")) {
    return "Error";
  } else {
    showResult();
    operator = "";
  }
}

function backspace() {
  if (secondNumber !== "") {
    secondNumber = secondNumber.slice(0, -1);
  } else if (operator !== "") {
    operator = operator.slice(0, -1);
  } else {
    firstNumber = firstNumber.slice(0, -1);
  }
  showDisplay();
}
