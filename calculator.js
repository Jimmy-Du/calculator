const calcDisplay = document.querySelector('.calc-display') // variable to store the calculator display to update with results

let firstNum = 0 // keeps track of the first number of the operation
let secondNum = 0 // keeps track of the second number of the operation
let selectedOperator = "" // keeps track of the desired operation of the calculation

let recentCalculation = false // keeps track if the most recent operation the calculator finished was a calculation
let operatorLastClicked = false // keeps track if the last button pressed was an operator button
let operatorSet = false // keeps track if an operator has been set for the current calculation



// Function:    operate()
// Description: carries out the desired calculation with the 2 numbers passed in
// Parameters:  operator: the operator to determine what kind of calculation to perform
//              num1: the first number of the calculation
//              num2: the second number of the calculation
// Return:      the result of the desired calculation
const operate = (operator, num1, num2) => {
  recentCalculation = true

  switch (operator) {
    case "+":
      return add(num1, num2)
    case "-":
      return subtract(num1, num2)
    case "*":
      return multiply(num1, num2)
    case "/":
      return divide(num1, num2)
    default:
      return num2
  }
}



// Function:    add()
// Description: adds the 2 numbers passed in
// Parameters:  num1: the first number of the operation
//              num2: the second number of the operation
// Return:      the sum of the 2 numbers added together
const add = (num1, num2) => {
  return Number(num1) + Number(num2)
}



// Function:    subtract()
// Description: subtracts the 2 numbers passed in
// Parameters:  num1: the first number of the operation
//              num2: the second number of the operation
// Return:      the sum of num1 subtracted from num2
const subtract = (num1, num2) => {
  return Number(num1) - Number(num2)
}



// Function:    multiply()
// Description: multiplies the 2 numbers passed in
// Parameters:  num1: the first number of the operation
//              num2: the second number of the operation
// Return:      the sum of the 2 numbers multiplied together
const multiply = (num1, num2) => {
  return Number(num1) * Number(num2)
}



// Function:    divide()
// Description: divides the 2 numbers passed in
// Parameters:  num1: the first number of the operation
//              num2: the second number of the operation
// Return:      the sum of the num1 divided by num2
const divide = (num1, num2) => {
  if (num2 == 0) {
    return "Error"
  }

  return Number(num1) / Number(num2)
}



// Function:    processEnteredNum()
// Description: 
// Parameters:  num: the number to be processed
// Return:      N/A
const processEnteredNum = (num) => {
  // if the current value in the display is not 0, append the clicked number to the display
  if (calcDisplay.value != "0" && !operatorLastClicked && !recentCalculation) {
    // if the pressed button is the negate button, the current number will be negated
    if (num === "-") {
      // if the number is negative, the negative symbol is removed
      if (calcDisplay.value.includes('-')) {
        calcDisplay.value = calcDisplay.value.substring(1)
      }
      // else, the negative symbol is added
      else {
        calcDisplay.value = num + calcDisplay.value
      }
    }
    // if the value of the button pressed is a decimal and the current value in the calculator display
    // does not contain a decimal or the button pressed is not a decimal, the value of the button is
    // added to the end of the calculator display value
    else if (num === "." && !calcDisplay.value.includes('.') || num !== ".") {
      calcDisplay.value = calcDisplay.value.concat(num)
    }
  }
  // else, set the display to the clicked number
  else {
    // if the first number button clicked is the decimal button, it will be appended to the end of the
    // current calculator value
    if (num === ".") {
      // if the decimal is clicked after a calculation has been recently completed or after
      // an operator button was clicked, the display is emptied before appending the decimal
      if (recentCalculation || operatorLastClicked) {
        emptyDisplay()
      }

      calcDisplay.value = calcDisplay.value + num
    }
    // if the number button was not the negate button, the calculator display is set to the value of the
    // button pressed
    else if (num !== "-") {
      calcDisplay.value = num
    }

    if (num !== "-") {
      operatorLastClicked = false
    }

    recentCalculation = false
  }
}



// Function:    processEnteredOperator()
// Description: sets the specified operator for the calculation
// Parameters:  operator: the operator to be set for the calculation
// Return:      N/A
const processEnteredOperator = (operator) => {
  // if the operator has been set and the last button clicked was not an operator,
  // the calculation is performed
  if (operatorSet && !operatorLastClicked) {
    secondNum = calcDisplay.value
    
    calcDisplay.value = operate(selectedOperator, firstNum, secondNum)
    
    firstNum = calcDisplay.value
  }
  // else, the first number of the calculation is set
  else {
    firstNum = calcDisplay.value
    recentCalculation = false
  }
  
  selectedOperator = operator

  operatorSet = true
  operatorLastClicked = true
}



// Function:    clearCalc()
// Description: resets the calculator display to nothing
// Parameters:  N/A
// Return:      N/A
const clearCalc = () => {
  emptyDisplay()
  selectedOperator = ""
  recentCalculation = false
  operatorLastClicked = false
  operatorSet = false
}



// Function:    emptyDisplay()
// Description: resets the calculator display to nothing
// Parameters:  N/A
// Return:      N/A
const emptyDisplay = () => {
  calcDisplay.value = 0
}



// Function:    numClick()
// Description: called upon when a number button is clicked and will add the
//              value of the button to the calculator display
// Parameters:  e: additional info on the event that called this function
// Return:      N/A
const numClick = (e) => {
  processEnteredNum(e.target.value)
}



// Function:    operatorClick()
// Description: called upon when an operator button is clicked and will store
//              the selected operator to later be used in the calculation
// Parameters:  e: additional info on the event that called this function
// Return:      N/A
const operatorClick = (e) => {
  processEnteredOperator(e.target.value)
}


// Function:    roundNumber()
// Description: function to round numbers to the scale passed in
//              retrieved from: 
//              https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
// Parameters:  num: the number to be rounded
//              scale: 
// Return:      
const roundNumber = (num, scale) => {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}



// Function:    equalClick()
// Description: called upon when the "=" button is clicked, and will carry out the calculation
//              specified by the user
// Parameters:  N/A
// Return:      N/A
const equalClick = () => {
  // if the equal button is being pressed after a recent calculation, the first number of 
  // the calculation is set to the number in the calculator display
  if (recentCalculation) {
    firstNum = calcDisplay.value
  }
  // else, the second number of the calculation is set to the number in the calculator display
  else {
    secondNum = calcDisplay.value
  }

  calcDisplay.value = roundNumber(operate(selectedOperator, firstNum, secondNum), 7)

  operatorLastClicked = false
  operatorSet = false
}



// Function:    backspaceClick()
// Description: called upon when a request to delete the most recent character added to
//              the calculator display and will remove the most recent character
// Parameters:  N/A
// Return:      N/A
const backspaceClick = () => {
  calcDisplay.value = calcDisplay.value.substring(0, calcDisplay.value.length - 1)

  // if the new calculator display value after removing a character is empty,
  // the display will be reset back to 0
  if (calcDisplay.value == "") {
    emptyDisplay()
  }
}



// Function:    onKeyDown()
// Description: called upon when a key is pressed while the calculator is focused and
//              will carry out the operation specified by the pressed key
// Parameters:  e: additional info about the keydown event
// Return:      N/A
const onKeyDown = (e) => {
  // if the pressed key is a number between 0 and 9, it will be added to 
  // the calculator display
  if (e.key >= 0 && e.key <= 9 || e.key === ".") {
    processEnteredNum(e.key)
  }
  // if the pressed key is an operator, the selected operator will be set for the
  // current calculation
  else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    processEnteredOperator(e.key)
  }
  // if the pressed key is backspace or delete, a character will be removed from 
  // the calculator display
  else if (e.key === "Backspace" || e.key === "Delete") {
    backspaceClick()
  }
  // if the pressed key is the enter or "=" key, the calculation will be calculated
  else if (e.key === "Enter" || e.key === "=") {
    equalClick()
  }
}



document.querySelectorAll('.num-btns button').forEach(btn => {
  btn.addEventListener('click', numClick)
})

document.querySelectorAll('.operator-btns button').forEach(btn => {
  if (btn.id !== "equal-btn") {
    btn.addEventListener('click', operatorClick)
  } 
})

document.querySelector('#equal-btn').addEventListener('click', equalClick)
document.querySelector('#clear-btn').addEventListener('click', clearCalc)
document.querySelector('#backspace-btn').addEventListener('click', backspaceClick)

document.querySelector('.calculator').addEventListener('keydown', onKeyDown)
