const varTest = document.querySelector('div');
const container = document.querySelector('.container');
const display = document.querySelector('#display');
const numContainer = document.querySelector('#numContainer');
const opContainer = document.querySelector('#opContainer');
const calcButton = document.querySelector('button');
const body = document.querySelector('body');

let numberA;
let operator;
let numberB;

let calculation = [];


const buttonContent = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '⌫', 'clear', ' = ', ' + ', ' - ', ' * ', ' ÷ '] 
const buttonId = ['num1', 'num2', 'num3', 'num4', 'num5', 'num6', 'num7', 'num8', 'num9', 'num0', 'dot', 'backspace', 'clear', 'equals', 'add', 'substract', 'multiply', 'divide', ]
const undefinedOrZero = (a, b) => a == undefined || b == undefined ? true : false;

const add = (a, b) => undefinedOrZero(a, b) ? 'ERROR' : a + b;
const substract = (a, b) => undefinedOrZero(a, b) ? 'ERROR' : a - b;
const multiply = (a, b) => undefinedOrZero(a, b) ? 'ERROR' : a * b; 
const divide = (a, b) => {
	if (undefinedOrZero(a, b)) return 'ERROR';
	if (b === 0) return 'IMPOSSIBRU';
	return a / b;
}

const operate = (numberA, operator, numberB) => {
	let result;
	let round = () => Math.round(result * 10000000000000) / 10000000000000;
	switch (operator) {
	case "+":
		result = add(numberA, numberB);
		return round();
		break;
	case "-":
		result = substract(numberA, numberB);
		return round();
		break;
	case "*":
		result = multiply(numberA, numberB);
		return round();
		break
	case "÷": 
		if (divide(numberA, numberB) === 'IMPOSSIBRU') {
			return result = divide(numberA, numberB)
		} else {
			result = divide(numberA, numberB);
			return round();
		};
		break;
	}
}

const storeValue = (id) => {
	const button = document.querySelector(`#${id}`);
	let disText = display.textContent;
	const lastChar = disText.charAt(disText.length-1);
	const firstChar = display.textContent.charAt(0);
	let rmLastChar = disText.slice(0,(disText.length-1));
	let rmLast3Char = disText.slice(0,(disText.length-3));
	let updated = button.textContent;
	let disTextArray = disText.split(' ');
	let textPos = disTextArray.length - 1
	let inspectArr = disTextArray[textPos].split('');
	let checkFull = () => {
		if (disTextArray.length >= 3 && disTextArray[2] !== '' && disTextArray[2] !== '-' && button.classList == 'operator') {
			return true;
		} else {
			return false;
		}
	};
	if (id === 'clear') {
		disText = '';
		display.classList.remove('finished');

	}
	if (disTextArray.length >= 3 && button.classList == 'operator' && lastChar == '-') return;
	let checkComplete = () => {
		if (disTextArray.length >= 3 && disTextArray[2] !== '' && lastChar !== '-') {
			return true;
		}
	}
	if (display.classList.value === 'finished' && button.classList == 'number' && button.id !== 'dot') {
		display.textContent = button.textContent;
		display.classList.remove('finished');
		return;
	} else if (button.classList == 'number') {
		disText += updated;
		display.classList.remove('finished');

	} 


	if (inspectArr.length > 12 && button.classList == 'number') return;
	if (checkFull()) {
		let result = operate(+disTextArray[0], disTextArray[1], +disTextArray[2]);
		(result == 'IMPOSSIBRU') ? 
		display.classList.add('finished') :
		result += updated;
		disText = result;
	} 
	
	if (button.classList == 'operator' && (lastChar === ' ' || lastChar == '-') && disTextArray.length > 0)  {
		// if (disTextArray[2] !== '-') updated = disText + '-';
		if (id == 'substract'){
			updated = disText + '-';

		} else {
			updated = rmLast3Char + button.textContent;
		}

		disText = updated;
	}
	if (button.classList == 'operator' && lastChar !== ' ' && !checkFull()) {
		if ((firstChar === '' || firstChar == 'I') && id == 'substract'){
		disText = '-';	
		display.classList.remove('finished');
		} else if (firstChar === '' || firstChar == 'I' || (firstChar == '-' && inspectArr.length == 1)) {
			return
		} else {
			display.classList.remove('finished');
			disText += button.textContent;
		}

		
	}
	if (id == 'backspace') {
		(lastChar == ' ') ?
		updated = rmLast3Char :
		updated = rmLastChar;
		disText = updated;
	}
	if (id == 'dot' && inspectArr.includes('.')) return;

	display.textContent = disText;

	if (id == 'equals' && checkComplete()) {
		let result = operate(+disTextArray[0], disTextArray[1], +disTextArray[2]);
		display.classList.add('finished');
		display.textContent = result;
	}
	if (id == 'equals') console.log(checkComplete())


}


const numContainerButtons = () => {
	for (let i=0; i<11; i++) {
		let button = document.createElement('button');
		button.textContent = buttonContent[i];
		button.id = buttonId[i];
		button.classList.add('number');
		button.addEventListener('click', () => storeValue(button.id));
		numContainer.appendChild(button);
	}
}

const backSpaceAndClear = () => {
	let buttonDiv = document.createElement('div');
	buttonDiv.id = 'backspaceClear';
	numContainer.appendChild(buttonDiv);
	for (let i=11; i<13; i++) {
		let button = document.createElement('button');
		button.textContent = buttonContent[i];
		button.id = buttonId[i];
		button.addEventListener('click', () => storeValue(button.id));
		buttonDiv.appendChild(button);
	}
}

const opContainerButtons = () => {
	for (let i=13; i<18; i++) {
		let button = document.createElement('button');
		button.textContent = buttonContent[i];
		button.id = buttonId[i];
		if (i>13) button.classList.add('operator');
		button.addEventListener('click', () => storeValue(button.id));
		opContainer.appendChild(button);
	}
}

numContainerButtons();
opContainerButtons();
backSpaceAndClear();

body.setAttribute('style', 'display: flex; justify-content: space-around; align-items: center;')

