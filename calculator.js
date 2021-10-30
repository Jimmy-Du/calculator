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
  // if the current value in the display is not 0, append the clicked number to the display
  if (calcDisplay.value != "0" && !operatorLastClicked && !recentCalculation) {
    // if the pressed button is the negate button, the current number will be negated
    if (e.target.value === "-") {
      // if the number is negative, the negative symbol is removed
      if (calcDisplay.value.includes('-')) {
        calcDisplay.value = calcDisplay.value.substring(1)
      }
      // else, the negative symbol is added
      else {
        calcDisplay.value = e.target.value + calcDisplay.value
      }
    }
    // if the value of the button pressed is a decimal and the current value in the calculator display
    // does not contain a decimal or the button pressed is not a decimal, the value of the button is
    // added to the end of the calculator display value
    else if (e.target.value === "." && !calcDisplay.value.includes('.') || e.target.value !== ".") {
      calcDisplay.value = calcDisplay.value.concat(e.target.value)
    }
  }
  // else, set the display to the clicked number
  else {
    // if the first number button clicked is the decimal button, it will be appended to the end of the
    // current calculator value
    if (e.target.value === ".") {
      // if the decimal is clicked after a calculation has been recently completed or after
      // an operator button was clicked, the display is emptied before appending the decimal
      if (recentCalculation || operatorLastClicked) {
        emptyDisplay()
      }

      calcDisplay.value = calcDisplay.value + e.target.value
    }
    // if the number button was not the negate button, the calculator display is set to the value of the
    // button pressed
    else if (e.target.value !== "-") {
      calcDisplay.value = e.target.value
    }

    if (e.target.value !== "-") {
      operatorLastClicked = false
    }

    recentCalculation = false
  }
}



// Function:    operatorClick()
// Description: called upon when an operator button is clicked and will store
//              the selected operator to later be used in the calculation
// Parameters:  e: additional info on the event that called this function
// Return:      N/A
const operatorClick = (e) => {
  console.log('hit')
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
  
  selectedOperator = e.target.value

  operatorSet = true
  operatorLastClicked = true
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

  calcDisplay.value = operate(selectedOperator, firstNum, secondNum)

  operatorLastClicked = false
  operatorSet = false
}


// Function:    backspaceClick()
// Description: 
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
