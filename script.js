// calculator script

let add = function addition(a, b) {
  return a + b;
};

let sub = function subtraction(a, b) {
  return a - b;
};

let mul = function multiplication(a, b) {
  return a * b;
};

let div = function division(a, b) {
  return a / b;
};

let firstNum = "";
let secondNum = "";
let operator = "";
let rounder = 10000000 ** 2;
const mainDisplay = document.querySelector(".mainDisplay");
const subDisplay = document.querySelector(".subDisplay");
const opBtns = document.querySelectorAll(".op");

let clearBtn = () => {
  firstNum =
    secondNum =
    operator =
    subDisplay.textContent =
    mainDisplay.textContent =
      "";
};

function operate(num1, num2, operator) {
  if (operator === "+") {
    subDisplay.textContent = "";
    return Math.round(add(num1, num2) * rounder) / rounder;
  } else if (operator === "-") {
    subDisplay.textContent = "";
    return Math.round(sub(num1, num2) * rounder) / rounder;
  } else if (operator === "*") {
    subDisplay.textContent = "";
    return Math.round(mul(num1, num2) * rounder) / rounder;
  } else if (operator === "/") {
    if (num2 === 0 || num2 === undefined) {
      clearBtn();
      return alert("can't divide by zero!");
    } else {
      subDisplay.textContent = "";
      return Math.round(div(num1, num2) * rounder) / rounder;
    }
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("num")) {
    mainDisplay.textContent += e.target.textContent;
  }

  if (e.target.classList.contains("dec")) {
    if (!mainDisplay.textContent.includes(".")) {
      mainDisplay.textContent += e.target.textContent;
    }
  }

  if (e.target.classList.contains("clr")) {
    clearBtn();
  }

  if (e.target.classList.contains("del")) {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
  }

  if (e.target.classList.contains("op")) {
    const newOperator = e.target.textContent;

    if (firstNum === "" && mainDisplay.textContent !== "") {
      firstNum = Number(mainDisplay.textContent);
      operator = newOperator;
      subDisplay.textContent = `${firstNum} ${newOperator}`;
      mainDisplay.textContent = "";
    } else if (mainDisplay.textContent !== "") {
      secondNum = Number(mainDisplay.textContent);
      firstNum = operate(firstNum, secondNum, operator);
      operator = newOperator;
      subDisplay.textContent = `${firstNum} ${newOperator}`;
      mainDisplay.textContent = "";
    }
  }

  if (e.target.classList.contains("eq")) {
    secondNum = Number(mainDisplay.textContent);
    mainDisplay.textContent = operate(firstNum, secondNum, operator);
    firstNum = secondNum = operator = "";
  }
});

document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key)) {
    mainDisplay.textContent += key;
  }

  if (key === "." && !mainDisplay.textContent.includes(".")) {
    mainDisplay.textContent += ".";
  }

  if (key === "Escape") {
    clearBtn();
  }

  if (key === "Backspace") {
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
  }

  if (["+", "-", "*", "/"].includes(key)) {
    const newOperator = key;

    if (firstNum === "" && mainDisplay.textContent !== "") {
      firstNum = Number(mainDisplay.textContent);
      operator = newOperator;
      subDisplay.textContent = `${firstNum} ${newOperator}`;
      mainDisplay.textContent = "";
    } else if (mainDisplay.textContent !== "") {
      secondNum = Number(mainDisplay.textContent);
      firstNum = operate(firstNum, secondNum, operator);
      operator = newOperator;
      subDisplay.textContent = `${firstNum} ${newOperator}`;
      mainDisplay.textContent = "";
    }
  }

  if (key === "Enter" || key === "=") {
    secondNum = Number(mainDisplay.textContent);
    mainDisplay.textContent = operate(firstNum, secondNum, operator);
    firstNum = secondNum = operator = "";
  }
});
