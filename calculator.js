const calcDisplay = document.querySelector('.calc-display')



// Function:    numClick()
// Description: called upon when a number button is clicked and will add the
//              value of the button to the calculator display
// Parameters:  e: additional info on the event that called this function
// Return:      N/A
const numClick = (e) => {
  calcDisplay.value = calcDisplay.value.concat(e.target.value)
}



document.querySelectorAll('.num-btn').forEach(btn => {
  btn.addEventListener('click', numClick)
})
