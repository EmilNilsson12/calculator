const btns = document.getElementById('calculator');

const numObj = {
    currentNum: null,
    prevNum: null,
    savedOperator: null
}


btns.addEventListener('mousedown', (evt) => {
    const btnPressed = evt.target.textContent;

    if (btnPressed != '') {
        console.log(btnPressed)
        console.log(typeof btnPressed)

        switch (btnPressed) {

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                // Update currentNum with btnPressed
                updateCurrentNum(btnPressed)
                break;


            case '=':
                if (numObj.prevNum != null && numObj.savedOperator != null && numObj.currentNum != null) {
                    calculate()
                }
                break;

            case 'del':
                // Delete latest entered digit/comma from currentNum
                deleteLastEnteredDigit()
                break;

            case 'clear':
                // Clear all displays
                clearAll()
                break;

            case '.':
                // Check if decimal already exists
                if (!decimalAlreadyExists()) {
                    updateCurrentNum(btnPressed)
                }
                break;

            case '/':
            case '*':
            case '-':
            case '+':
                if (numObj.prevNum != null && numObj.savedOperator != null && numObj.currentNum != null) {
                    calculate()
                }

                if (numObj.currentNum != null || numObj.prevNum != null) {
                    saveOperator(btnPressed)
                }

                if (numObj.currentNum != null) {
                    moveCurrentNumtoPrevNum()
                }

                break;

            case '-/+':
                swapSign()

                break;
        }
        printNums()
        console.table(numObj)
    }

});

function updateCurrentNum(digit) {
    if (numObj.currentNum == null || numObj.currentNum == '0' && digit != '.') {
        numObj.currentNum = digit
    }
    else {
        numObj.currentNum += digit;
    }
}

function deleteLastEnteredDigit() {
    if (numObj.currentNum != null) {

        // Convert string to array
        let num = numObj.currentNum.split('');

        // Remove last digit
        num.pop();

        // Convert back to string
        num = num.join('');

        // Replace currentNum with new value
        numObj.currentNum = num;
    }

    if (numObj.currentNum == '') {
        numObj.currentNum = null
    }
}


function saveOperator(operator) {
    // Save operator in numObj
    numObj.savedOperator = operator;
}

function moveCurrentNumtoPrevNum() {
    if (numObj.currentNum != '-') {
        numObj.prevNum = parseFloat(numObj.currentNum);
        numObj.currentNum = null;
    }
}

function calculate() {
    if (numObj.currentNum != '-') {
        const num1 = parseFloat(numObj.prevNum);
        const num2 = parseFloat(numObj.currentNum);

        let result;
        switch (numObj.savedOperator) {

            case '+':
                result = add(num1, num2)
                break;

            case '-':
                result = subtract(num1, num2)
                break;

            case '*':
                result = multiply(num1, num2)
                break;

            case '/':
                result = divide(num1, num2)
                break;
        }

        if (isNaN(result)) result = 0;

        // Save result in prevNum
        numObj.prevNum = result;

        // Clear currentNum
        numObj.currentNum = null;

        // Clear savedOperator
        numObj.savedOperator = null;
    }
}



function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}


const numDisplay = document.getElementById('num-inner-right');
const operatorDisplay = document.getElementById('operator-display');
const numDisplayTotal = document.getElementById('num-inner-left');

function printNums() {
    numDisplay.innerHTML = numObj.currentNum
    numDisplayTotal.innerHTML = numObj.prevNum
    operatorDisplay.innerHTML = numObj.savedOperator
}

function decimalAlreadyExists() {
    let currentNumAsArr = numObj.currentNum.split('');

    const found = currentNumAsArr.find(digit => digit == ',')

    console.log(found);

    if (found === undefined) return false
    else return true
}

function swapSign() {
    if (numObj.currentNum != null) {
        // Convert string to array
        let num = numObj.currentNum.split('');

        if (num[0] != '-') {
            // Add '-' to start
            num.unshift('-');

            // Convert back to string
            num = num.join('');

            // Replace currentNum with new value
            numObj.currentNum = num;
        }
        else {
            // Add '-' to start
            num.shift();

            // Convert back to string
            num = num.join('');

            // Replace currentNum with new value
            numObj.currentNum = num;
        }
    }
    else {
        numObj.currentNum = '-'
    }
}


function clearAll() {
    // Clear prevNum
    numObj.prevNum = null;

    // Clear currentNum
    numObj.currentNum = null;

    // Clear savedOperator
    numObj.savedOperator = null;
}

