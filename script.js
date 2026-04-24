const varTest = document.querySelector('div');
const container = document.querySelector('.container');
const display = document.querySelector('#display');
const numContainer = document.querySelector('#numContainer');
const opContainer = document.querySelector('#opContainer');
const calcButton = document.querySelector('button');

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
	switch (operator) {
	case "+":
		add(numberA, numberB);
		break;
	case "-":
		substract(numberA, numberB);
		break;
	case "*":
		multiply(numberA, numberB);
		break
	case "/": 
		divide(numberA, numberB);
		break;
	}
}

const numContainerButtons = () => {
	for (let i=0; i<12; i++) {
		let button = document.createElement('button');
		button.textContent = buttonContent[i];
		button.id = buttonId[i];
		button.setAttribute('data-value', `${buttonContent[i]}`);
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

const storeValue = (id) => {
	const button = document.querySelector(`#${id}`);
	console.log(button);
	const value = button.dataValue;
	let disText = display.textContent;
	let rmLastChar = disText.slice(0,(disText.length-1));
	let rmLast3Char = disText.slice(0,(disText.length-3));
	let updated = button.textContent;
	let disTextArray = disText.split(' ');
	if (disTextArray.length >= 3 && disTextArray[disTextArray.length-1] !== '') return;
	if (button.classList == 'number') disText += updated;
	if (button.classList == 'operator' && disText.charAt(disText.length-1) == ' ') {
		updated = rmLast3Char + button.textContent;
		disText = updated;
	}
	if (button.classList == 'operator' && disText.charAt(disText.length-1) !== ' ') {
		disText += button.textContent;
	}
	if (id == 'backspace') {
		(disText.charAt(disText.length-1) == ' ') ?
		updated = rmLast3Char :
		updated = rmLastChar;
		disText = updated;
	}
	display.textContent = disText;
}



