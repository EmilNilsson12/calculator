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
                // Calculate savedNum and currentNum using currentOperator

                // Overwrite savedNum with result

                break; 

            case 'del':
                // Delete latest entered digit/comma from currentNum
                deleteLastEnteredDigit()
                break;

            case ',':

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
        }
        console.table(numObj)
    }

});

function updateCurrentNum(digit) {
    if (numObj.currentNum == null) {
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
}


function saveOperator(operator) {
    // Save operator in numObj
    numObj.savedOperator = operator;
}

function moveCurrentNumtoPrevNum() {
    numObj.prevNum = numObj.currentNum;
    numObj.currentNum = null;
}

function calculate() {
    // Get prevNum

    let result;
    switch(numObj.savedOperator) {

        case '+':
            result = add()
            break;

        case '-':
            result = subtract()
            break;

        case '*':
            result = multiply()
            break;

        case '/':
            result = divide()
            break;
    }

    // Save result in prevNum
    numObj.prevNum = result;

    // Clear currentNum
    numObj.currentNum = null;

    // Clear savedOperator
    numObj.savedOperator = null;
}