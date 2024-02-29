// Cache elements
const resultDiv = document.querySelector('.result');
const inputButtons = document.querySelectorAll('.inputButton');
// Input vars
let resultDisplay = 123456;
let firstEnteredNumber = 0;
let secondEnteredNumber = 0;
let enteredOperator = "";

//Math Functions
const add = (number1, number2) => number1 + number2;
const subtract = (number1, number2) => number1 - number2 ;
const multiply = (number1, number2) => number1 * number2 ;
const divide = (number1, number2) => number1 / number2 ;
const power = (number1, number2) => number1 ** number2 ;

//Perform operations
function operate (number1, number2, operator){
    clearDisplay()
    let result = 0
    switch(operator){
        case "+":
            result = add(number1, number2);
            break;
        case "-":
            result =  subtract(number1, number2);
            break;
        case "*":
            result =  multiply(number1, number2);
            break;
        case "/":
            result =  divide(number1, number2);
            break;
        case "**":
            result =  power(number1, number2);
            break;    
        default:
            result =  "Error: Invalid operator input";
    };
    return updateResult(result)
};
function updateResult(number){
    resultDisplay += number
    return resultDiv.textContent = resultDisplay
};
function clearDisplay(){
    resultDisplay = 0
    return resultDiv.textContent = resultDisplay
};




console.log(inputButtons);
clearDisplay()
updateResult(123456789)
operate(3,2, "+")
// operate(3,2, "-")
// operate(3,2, "*")
// operate(3,2, "/")
// operate(3,2, "**")
