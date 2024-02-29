// Cache elements
const resultDiv = document.querySelector(".result");
const inputButtons = document.querySelectorAll(".inputButton");

// Input vars
let resultVar = 0;
let lastResult = 0;
let firstEnteredNumber = 0;
let secondEnteredNumber = 0;
let enteredOperator = "";
let isFirstNumberEntered = false;

// array of available operators
const operators = ["+", "-", "*", "/", "**"];

// Event Listeners
inputButtons.forEach((btn) => btn.addEventListener("click", handleInput));
document.addEventListener("keyup", handleInput);

// Click handler
function handleInput(e){
    let value = ""
    if(e.type === "click") {
        makeActive(e.target)
        value = e.target.dataset.value
    }
    if(e.type === "keyup") {
        value = e.key
        if(value === "Enter") value = "="
        if(value === "Escape" || value === "Backspace") value = "clear"
        target = document.querySelector(`[data-value="${value}"]`)
        makeActive(target)
    }
	if (value === "=") return inputEqual();
	if (value === "clear") return inputClear();
	if (operators.includes(value)) return inputOperator(value);
	if (value.match(/[0-9]/g)) return inputNumber(value);
}
// Input functions
function inputEqual() {
	//calculate new result
	const result = operate(
		firstEnteredNumber,
		secondEnteredNumber,
		enteredOperator
	);

	// save last given result
	lastResult = resultVar;

	// save current result
	resultVar = result;

	//reset input vars
	isFirstNumberEntered = true;
	firstEnteredNumber = result;
	secondEnteredNumber = 0;
	enteredOperator = "+";

	// update display
	clearDisplay();
	renderDisplay(result);
}
function inputClear() {
	//reset results
	lastResult = 0;
	resultVar = 0;
	//reset inputs
	firstEnteredNumber = 0;
	secondEnteredNumber = 0;
	enteredOperator = 0;
	isFirstNumberEntered = false;
	//clear the display
	clearDisplay();
}
function inputOperator(value) {
	enteredOperator = value;
	isFirstNumberEntered = true;
	if (secondEnteredNumber !== 0) {
		inputEqual();
	}
	// clearDisplay()
}
function inputNumber(value) {
	console.log("number: ", value);
	if (!isFirstNumberEntered) {
		firstEnteredNumber === 0
			? (firstEnteredNumber = value)
			: (firstEnteredNumber += value);
	} else {
		secondEnteredNumber === 0
			? (secondEnteredNumber = value)
			: (secondEnteredNumber += value);
	}
	let number = isFirstNumberEntered
		? secondEnteredNumber
		: firstEnteredNumber;
	renderDisplay(number);
}

// Math Functions
const add = (number1, number2) => number1 + number2;
const subtract = (number1, number2) => number1 - number2;
const multiply = (number1, number2) => number1 * number2;
const divide = (number1, number2) => number1 / number2;
const power = (number1, number2) => number1 ** number2;

// Perform operations
function operate(number1, number2, operator) {
	number1 = Number(number1);
	number2 = Number(number2);
	let result = 0;
	switch (operator) {
		case "+":
			result = add(number1, number2);
			break;
		case "-":
			result = subtract(number1, number2);
			break;
		case "*":
			result = multiply(number1, number2);
			break;
		case "/":
			result = divide(number1, number2);
			break;
		case "**":
			result = power(number1, number2);
			break;
	}
	return result;
}

// Manage display
function renderDisplay(number) {
	return (resultDiv.textContent = number);
}
function clearDisplay() {
	return (resultDiv.textContent = 0);
}
function makeActive(inputButton){
    inputButtons.forEach(btn => btn.classList.remove('active'))
    inputButton.classList.add('active')
}