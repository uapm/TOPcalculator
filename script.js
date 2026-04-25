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


const buttonContent = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '⌫', ' = ', ' + ', ' - ', ' * ', ' ÷ '] 
const buttonId = ['num1', 'num2', 'num3', 'num4', 'num5', 'num6', 'num7', 'num8', 'num9', 'num0', 'dot', 'backspace', 'equals', 'add', 'substract', 'multiply', 'divide', ]
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
	switch (operator) {
	case "+":
		result = add(numberA, numberB);
		break;
	case "-":
		result = substract(numberA, numberB);
		break;
	case "*":
		result = multiply(numberA, numberB);
		break
	case "÷": 
		result = divide(numberA, numberB);
		break;
	}
	return Math.round(result * 10000000000000) / 10000000000000;
}

const storeValue = (id) => {
	const button = document.querySelector(`#${id}`);
	let disText = display.textContent;
	const lastChar = disText.charAt(disText.length-1)
	let rmLastChar = disText.slice(0,(disText.length-1));
	let rmLast3Char = disText.slice(0,(disText.length-3));
	let updated = button.textContent;
	let disTextArray = disText.split(' ');
	let textPos = disTextArray.length - 1
	let inspectArr = disTextArray[textPos].split('');
	let checkFull = () => {
		if (disTextArray.length >= 3 && disTextArray[2] !== '' && button.classList == 'operator') {
			return true;
		}
	};
	let checkComplete = () => {
		if (disTextArray.length >= 3 && disTextArray[2] !== '') {
			return true;
		}
	}
	if (display.classList.value === 'finished' && button.classList == 'number' && button.id !== 'dot' || disText == 'IMPOSSIBRU') {
		display.textContent = button.textContent;
		display.classList.remove('finished');

		return;
	} else if (button.classList == 'number') {
		disText += updated;
		display.classList.remove('finished');

	} else {
		display.classList.remove('finished');
	}


	if (checkFull() == true || (inspectArr.length > 12 && button.classList == 'number')) return;
	
	if (button.classList == 'operator' && lastChar == ' ') {
		updated = rmLast3Char + button.textContent;
		disText = updated;
	}
	if (button.classList == 'operator' && lastChar !== ' ') {
		disText += button.textContent;
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


}


const numContainerButtons = () => {
	for (let i=0; i<12; i++) {
		let button = document.createElement('button');
		button.textContent = buttonContent[i];
		button.id = buttonId[i];
		if (i<11) button.classList.add('number');
		button.addEventListener('click', () => storeValue(button.id));
		numContainer.appendChild(button);
	}
}

const opContainerButtons = () => {
	for (let i=12; i<17; i++) {
		let button = document.createElement('button');
		button.textContent = buttonContent[i];
		button.id = buttonId[i];
		button.setAttribute('data-value', `${buttonContent[i]}`);
		if (i>12) button.classList.add('operator');
		button.addEventListener('click', () => storeValue(button.id));
		opContainer.appendChild(button);
	}
}

numContainerButtons();
opContainerButtons();

body.setAttribute('style', 'display: flex; justify-content: space-around; align-items: center;')

