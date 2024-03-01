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
const enterKeys = ["Enter", "="]
const clearKeys = ["clear", "Backspace", "Escape"]

// Event Listeners
inputButtons.forEach((btn) => btn.addEventListener("click", handleInput));
document.addEventListener("keyup", handleInput);

// Click handler
function handleInput(e){
    let value = ""
    let target = ""
    if(e.type === "click") {
        target = e.target
        value = e.target.dataset.value
    }
    if(e.type === "keyup") {
        value = e.key
		if(value === "Enter") value = "="
		if(value === "Escape" || value === "Backspace") value = "clear"
        target = document.querySelector(`[data-value="${value}"]`)
    }
    if(!validateInput(value)) return
	makeActive(target)
    if (enterKeys.includes(value)) return inputEqual();
	if (clearKeys.includes(value)) return inputClear();
	if (operators.includes(value)) return inputOperator(value);
	if (value.match(/[0-9]/)) return inputNumber(value);
}
// Input functions
function inputEqual() {
	let result = firstEnteredNumber
	
	//calculate new result
	if(isFirstNumberEntered && enteredOperator && secondEnteredNumber){
		result = operate(
			firstEnteredNumber,
			secondEnteredNumber,
			enteredOperator
		);
	
	}
	
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
    resultDiv.dataset.operator = "="
	clearDisplay();
	renderDisplay(result.toFixed(3));
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
    resultDiv.dataset.operator = value
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
			if(number2 === 0) {
				result = "Hahaha, very funny ☻"
				setTimeout(inputClear, 1000)
				break;
			}
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

function validateInput(value){
    if(value.match(/[0-9]/g)) return true
    if(operators.includes(value)) return true
    if(value === "=" || value === "Enter") return true
    if(value === "clear" || value === "Backspace" || value === "Escape") return true
    return false
}

function randomizeColor(){
    const rndVal = ()=> Math.floor(Math.random() * 220) 
	const r = rndVal()
	const g = rndVal()
	const b = rndVal()
	const color = `${r}, ${g}, ${b}`
	const element = document.querySelector(':root')
	console.log("before: ", getComputedStyle(element).getPropertyValue('--color-main'))
	element.style.setProperty('--color-main', `rgb(${color})`)
	console.log("after: ", getComputedStyle(element).getPropertyValue('--color-main'))


   
}
randomizeColor()