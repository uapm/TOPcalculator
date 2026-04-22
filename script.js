let numberA;
let operator;
let numberB;

const buttonContent = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ',', '⌫', '=', '+', '-', '*', '÷'] 

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