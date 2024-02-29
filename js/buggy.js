// Cache elements
const resultDiv = document.querySelector('.result');
const inputButtons = document.querySelectorAll('.inputButton');
const calculator = document.querySelector('.calculator')
// Input vars
let resultDisplay = 123456;
let firstEnteredNumber = 0;
let secondEnteredNumber = 0;
let firstNumberEntered = false
let enteredOperator = "";

//event listners an click handler
inputButtons.forEach(btn => btn.addEventListener("click", handleClick))
calculator.addEventListener("keyup", handleKeyPress)

function handleClick(e){
    let value = e.currentTarget.dataset.value
    console.log(value)
    function numberEntered(value){
        value !== "." ? value = Number(value): value
        !firstNumberEntered ?
         firstEnteredNumber += value : 
         secondEnteredNumber += value
         updateResult(value)
    }

    function operatorEntered(value){
        enteredOperator = value
        firstNumberEntered = true
        clearDisplay()
    }
    function equalEntered(value){
        operate(firstEnteredNumber, secondEnteredNumber, enteredOperator)
        
        firstEnteredNumber = resultDisplay
        secondEnteredNumber = 0
        enteredOperator = ""
        
    }
    function clearEntered(value){
        firstEnteredNumber = 0
        secondEnteredNumber = 0
        enteredOperator = ""
        firstNumberEntered = false
        clearDisplay()
    }
    switch(value){
        case "+":
            operatorEntered(value)
            break;
        case "-":
            operatorEntered(value)
            break;
        case "*":
            operatorEntered(value)
            break;            
        case "/":
            operatorEntered(value)
            break;
        case "**":
            operatorEntered(value)
            break;
        case "clear":
            clearEntered(value)
            break;    
        case "=":
            equalEntered(value)
            break;
        default: 
            numberEntered(value)
            
        }

}
function handleKeyPress(){}

//Math Functions
const add = (number1, number2) => number1 + number2;
const subtract = (number1, number2) => number1 - number2 ;
const multiply = (number1, number2) => number1 * number2 ;
const divide = (number1, number2) => number1 / number2 ;
const power = (number1, number2) => number1 ** number2 ;

//Perform operations
function operate (number1, number2, operator){
    clearDisplay()
    console.log(`Inputs: ${firstEnteredNumber} ${enteredOperator} ${secondEnteredNumber}`)
    console.log(`Opreation: ${number1} ${operator} ${number2}`)
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
    
    updateResult(result)
    return result
};
function updateResult(number){
    resultDisplay === 0 ? resultDisplay = number : resultDisplay += number
    firstEnteredNumber = resultDisplay
    firstNumberEntered = true
    return resultDiv.textContent = resultDisplay
};
function clearDisplay(){
    resultDisplay = 0
    return resultDiv.textContent = resultDisplay
};
clearDisplay()



