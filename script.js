const varTest = document.querySelector('div');
const container = document.querySelector('.container');
const display = document.querySelector('#display');
const numContainer = document.querySelector('#numContainer');
const opContainer = document.querySelector('#opContainer');

let numberA;
let operator;
let numberB;

const buttonContent = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '⌫', '=', '+', '-', '*', '÷'] 
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
		numContainer.appendChild(button);
	}
}

const opContainerButtons = () => {
	for (let i=12; i<17; i++) {
		let button = document.createElement('button');
		button.textContent = buttonContent[i];
		button.id = buttonId[i];
		opContainer.appendChild(button);
	}
}

numContainerButtons();
opContainerButtons();