const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");
const backspace = document.getElementById("backspace");

const sqrt = document.getElementById("sqrt");
const log = document.getElementById("log");
const convert = document.getElementById("convert");

let currentInput = "";

// Handle number/operator button clicks
buttons.forEach(button => {
  const value = button.getAttribute("data-value");
  if (!value) return;

  button.addEventListener("click", () => {
    currentInput += value;
    display.value = currentInput;
  });
});

// Equal = Evaluate expression
equals.addEventListener("click", () => {
  try {
    const result = eval(currentInput);
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = "Error";
    currentInput = "";
  }
});

// Clear
clear.addEventListener("click", () => {
  currentInput = "";
  display.value = "";
});

// Backspace
backspace.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
});

// Square Root
sqrt.addEventListener("click", () => {
  try {
    const value = parseFloat(display.value || currentInput);
    if (value < 0) throw new Error("Invalid input");
    const result = Math.sqrt(value);
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = "Error";
    currentInput = "";
  }
});

// Logarithm (base 10)
log.addEventListener("click", () => {
  try {
    const value = parseFloat(display.value || currentInput);
    if (value <= 0) throw new Error("Invalid input");
    const result = Math.log10(value);
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = "Error";
    currentInput = "";
  }
});

// cm ⇄ inch conversion
let isCm = true;
convert.addEventListener("click", () => {
  try {
    const value = parseFloat(display.value || currentInput);
    if (isNaN(value)) throw new Error("Invalid input");
    let result;
    if (isCm) {
      result = (value / 2.54).toFixed(4); // cm → inch
    } else {
      result = (value * 2.54).toFixed(4); // inch → cm
    }
    isCm = !isCm;
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = "Error";
    currentInput = "";
  }
});