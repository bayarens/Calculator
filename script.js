//These are all the references I made for the places that are displaying numbers, the frame of the whole thing, and the hide butto
const displayBox = document.querySelector("#display-box input")

const displayBoxHolder = document.querySelector("#display-box-holder input")

const hideButton = document.querySelector("#hide-button")

const calculator = document.querySelector("#calculator-frame")

//references for my buttons 
const numKeys = document.querySelectorAll("button.num")

const operKeys = document.querySelectorAll("button.opp")

const clearKey = document.querySelector("#clear")

const equalKey = document.querySelector("#equal")

//this is the function that will take take the buttons I've pressed (if they are numbers) and populate the display box
const populateDisplayBox = (button) => {
    displayBox.value += button.innerText
    clearKey.innerText = "C"
}

//populating display box
numKeys.forEach(numKey => numKey.addEventListener("click", () => populateDisplayBox(numKey)));

// this is the function that will take what was in the display box and put it into the display box below to hold the value after an operation is entered
const populateDisplayBoxHolder = (button) => {
    displayBoxHolder.value = displayBox.value
    displayBox.value = ""
    operator = button.innerText
    button.classList.toggle("active")
    if(activeButton){
        activeButton.classList.toggle("active")
    }
    activeButton = button
}

let activeButton 

// these are all my operations so when I hit a operation it will take will do the math on the 
//numbers in the display box and display box holder by running them through the calculate function
let operator = ""

const operators = {
    "+": () => +displayBoxHolder.value + +displayBox.value,
    "-": () => displayBoxHolder.value - displayBox.value,
    "*": () => displayBoxHolder.value * displayBox.value,
    "/": () => displayBoxHolder.value / displayBox.value,
    "^": () => displayBoxHolder.value ** displayBox.value,
}

// want to write code that says, after I hit an opperator key, whatever was in the display box should be pushed to the display box holder and then 
console.log(operKeys)
operKeys.forEach(operKey => operKey.addEventListener("click", () => populateDisplayBoxHolder(operKey)));

//this is the function that actually does the calculation
const calculate = () => {
    if(!operator){
        return
    }
    displayBox.value = operators[operator]()
    displayBoxHolder.value = ""
    activeButton.classList.remove("active")
    activeButton = null
    operator = null
}
//added event listener to clear key and called the calculate function
equalKey.addEventListener("click", calculate)

//the clear key function, also changed it from A/C to C
function clear() {
    if (displayBox.value) {
        displayBox.value = ""
    } else {
        displayBoxHolder.value = ""
    }
    clearKey.innerText = "A/C"
    if (activeButton){
        activeButton.classList.remove("active")
    }
    activeButton = null
    operator = null
}

clearKey.addEventListener("click", clear)

// this is the event listener that that will change the hide button to show when it is pressed 
hideButton.addEventListener("click", onToggleHideClick)

function onToggleHideClick(e){
    calculator.classList.toggle('hide');
    e.target.innerText = calculator.classList.contains('hide') ? 'Show' : 'Hide'
}