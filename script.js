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
  "mod": modulus,
  "^": power,
};

const singleOperations = {
  "%": percentage,
  "√": sqrt,
  "+/-": plusOrMinus,
  "!": factorial,
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

lowerDisplay.value = "0";
upperDisplay.value = "";

// Function to handle number input
function handleNumberInput(value) {
  if (value === "π") {
    // Handle π by multiplying it with the current number
    if (operator === "") {
      if (firstNumber === "") {
        firstNumber = Math.PI.toString(); // Just π
        upperDisplay.value = "π = " + roundToFixed(firstNumber);
      } else {
        const temp = multiply(firstNumber, Math.PI.toString());
        upperDisplay.value =
          roundToFixed(firstNumber) + "π = " + roundToFixed(temp);
        firstNumber = temp;
      }
    } else {
      if (secondNumber === "") {
        secondNumber = Math.PI.toString(); // Just π in the second number
        upperDisplay.value = "π = " + roundToFixed(secondNumber);
      } else {
        const temp = multiply(secondNumber, Math.PI.toString());
        upperDisplay.value =
          roundToFixed(secondNumber) + "π = " + roundToFixed(temp);
        secondNumber = temp;
      }
    }
  } else {
    // Prevent multiple decimals
    if (
      value === "." &&
      (operator === "" ? firstNumber.includes(".") : secondNumber.includes("."))
    ) {
      return;
    }
    // Handle normal numbers
    if (operator === "") {
      firstNumber += value;
    } else {
      secondNumber += value;
    }
  }
  showDisplay();
}

function handleOperatorInput(value) {
  if (firstNumber === "") {
    return "";
  } else if (operator === "") {
    operator = value;
  } else if (secondNumber === "") {
    operator = value;
  } else {
    showResult();
    operator = value;
  }
  showDisplay();
}

function handleSingleOperatorInput(value) {
  let result;
  if (firstNumber === "") {
    return "";
  } else if (operator === "") {
    // Unary operators applied to firstNumber
    if (singleOperations[value]) {
      result = singleOperations[value](firstNumber);
      result = roundToFixed(result); //Round the result

      if (value === "!") {
        upperDisplay.value =
          roundToFixed(firstNumber) + "! = " + roundToFixed(result);
      } else if (value === "√") {
        upperDisplay.value =
          "√(" + roundToFixed(firstNumber) + ") = " + roundToFixed(result);
      } else if (value === "%") {
        upperDisplay.value =
          roundToFixed(firstNumber) + "% = " + roundToFixed(result);
      }

      firstNumber = result.toString();
    }
  } else if (secondNumber === "") {
    return "";
  } else {
    // Unary operators applied to secondNumber
    if (singleOperations[value]) {
      result = singleOperations[value](secondNumber);
      result = roundToFixed(result); //Round the result

      if (value === "!") {
        upperDisplay.value =
          roundToFixed(secondNumber) + "! = " + roundToFixed(result);
      } else if (value === "√") {
        upperDisplay.value =
          "√(" + roundToFixed(secondNumber) + ") =" + roundToFixed(result);
      } else if (value === "%") {
        upperDisplay.value =
          roundToFixed(secondNumber) + "% = " + roundToFixed(result);
      }

      secondNumber = result.toString();
    }
  }
  showDisplay();
}

function handleControlInput(value) {
  controls[value]();
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.textContent;

    if (numbers[value]) {
      handleNumberInput(value);
    } else if (operations[value]) {
      handleOperatorInput(value);
    } else if (singleOperations[value]) {
      handleSingleOperatorInput(value);
    } else if (controls[value]) {
      handleControlInput(value);
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
  let result = parseFloat(num1) / parseFloat(num2);

  return parseFloat(num1) / parseFloat(num2);
}

function modulus(num1, num2) {
  return parseFloat(num1) % parseFloat(num2);
}

function percentage(num) {
  return parseFloat(num) / 100;
}

function power(base, exponent) {
  return Math.pow(parseFloat(base), parseFloat(exponent));
}

function sqrt(num) {
  const result = Math.sqrt(parseFloat(num));

  // Handle negative square root (which results in NaN)
  if (isNaN(result)) {
    return "Error"; // Return 'Error' for invalid square roots
  }

  return result;
}

function plusOrMinus(num) {
  return (parseFloat(num) * -1).toString();
}

function factorial(num) {
  num = parseInt(num, 10);
  if (num < 0) return "Error";
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }
  return result;
}

function operate(num1, num2, operator) {
  let result;
  if (operations[operator]) {
    result = operations[operator](num1, num2);
  }
  // Handle division by Zero
  if (result === Infinity || result === -Infinity) {
    return "Error: Division by 0? Let’s not anger the math gods.";
  }

  // Handle invalid operations resulting in NaN
  if (isNaN(result)) {
    return "Error"; // Return 'Error' for invalid operations
  }

  return roundToFixed(result); // Round the result and return
}

function showDisplay() {
  if (firstNumber === "") {
    lowerDisplay.value = "0";
  } else {
    lowerDisplay.value =
      firstNumber + (operator ? " " + operator + " " : " ") + secondNumber;
  }
}

function showResult() {
  const result = operate(firstNumber, secondNumber, operator);

  if (
    result === "Error: Division by 0? Let’s not anger the math gods." ||
    result === "Error"
  ) {
    upperDisplay.value = result; // Display the error
  } else {
    upperDisplay.value =
      firstNumber + " " + operator + " " + secondNumber + " = " + result;
    firstNumber = result.toString(); // Store the result for future operations
  }

  operator = ""; // Clear operator
  secondNumber = ""; // Clear secondNumber
  lowerDisplay.value = firstNumber; // Update the lower display
}

function clear() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  upperDisplay.value = "";
  lowerDisplay.value = "0";
}

function equals() {
  if (firstNumber === "" || operator === "" || secondNumber === "") {
    return;
  } else {
    showResult();
  }
}

function backspace() {
  if (secondNumber !== "") {
    secondNumber = secondNumber.slice(0, -1);
  } else if (operator !== "") {
    operator = "";
  } else {
    firstNumber = firstNumber.slice(0, -1);
  }
  showDisplay();
}

function roundToFixed(value, decimals = 9) {
  if (isNaN(value) || value === "") return value; // Return original value if it's not a number
  return parseFloat(value)
    .toFixed(decimals)
    .replace(/\.?0+$/, ""); // Remove trailing zeros
}
