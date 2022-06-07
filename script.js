/* DOM CAPTURE */

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const operatorButtons = document.querySelectorAll(".operator");

/* EVENT LISTENERS */

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (memory.displayResult) {
      if (memory.equalsClicked) {
        clearMemory();
        memory.equalsClicked = false;
      }
      clearDisplay();
      memory.display = null;
      memory.displayResult = false;
    }
    if (memory.display !== null && memory.display.length >= 15) {
      return;
    }
    saveToDisplay(button.dataset.number);
    displayNumbers(button.dataset.number);
  });
});

clearButton.addEventListener("click", () => {
  clearMemory();
  clearDisplay();
  console.log(memory);
});

equalsButton.addEventListener("click", () => {
  if (memory.display === null || memory.num1 === null) {
    return;
  }
  if (memory.num2 === null) {
    memory.num2 = memory.display;
  }
  memory.display = null;
  clearDisplay();

  const result = operate(memory.operator, +memory.num1, +memory.num2);
  memory.num1 = result;
  memory.display = result;
  memory.displayResult = true;
  memory.equalsClicked = true;
  console.log(memory);
  displayResult(result);
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(memory);
    if (memory.display === null) {
      return;
    }

    if (memory.equalsClicked) {
      memory.num2 = null;
      memory.operator = null;
      memory.display = null;
      memory.displayResult = false;
      memory.equalsClicked = false;
      clearDisplay();
    }

    if (memory.num1 === null) {
      memory.num1 = memory.display;
      clearDisplay();
      memory.display = null;
    }

    if (memory.display && memory.num1) {
      console.log(memory);
      memory.num2 = memory.display;
      const result = operate(memory.operator, +memory.num1, +memory.num2);
      memory.num1 = result;
      memory.display = result;
      memory.displayResult = true;
      memory.num2 = null;

      displayResult(result);
      console.log(memory);
    }

    memory.operator = button.dataset.operator;
  });
});

/* DOM MANIPULATION */

function displayNumbers() {
  display.textContent = memory.display;
}

function clearDisplay() {
  display.textContent = "";
}

function displayResult(result) {
  display.textContent = result;
}

/* MEMORY */

const memory = {
  display: null,
  num1: null,
  num2: null,
  operator: null,
  displayResult: false,
  equalsClicked: false,
};

/* FUNCTIONS */

function clearMemory() {
  memory.display = null;
  memory.num1 = null;
  memory.num2 = null;
  memory.operator = null;
  memory.displayResult = false;
  memory.equalsClicked = false;
}

function saveToDisplay(number) {
  if (memory.display === null || memory.display === 0) {
    memory.display = number.toString();
    return;
  }
  memory.display += number.toString();
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
  }
}
