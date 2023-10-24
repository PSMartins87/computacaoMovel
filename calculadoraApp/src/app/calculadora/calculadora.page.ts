import { Component } from '@angular/core';

@Component({
    selector: 'app-calculadora',
    templateUrl: 'calculadora.page.html',
    styleUrls: ['calculadora.page.scss']
})
export class CalculadoraComponent {
    public expression: string = '0';
    private stack: string[] = [];
    public floatExpression: Number = 0;
    backspace() {
        if (this.expression.length > 0) {
            this.expression = this.expression.slice(0, -1);
        }
    }

    appendCharacter(character: string) {
        if (this.isLastCharacterAnOperation() && this.isOperation(character)) {
            return;
        }
        if (this.expression.length > 0 && this.expression == '0') { 
            this.expression = '';
        }
        this.expression += character;
    }

    clear() {
        this.expression = '';
        this.stack = [];
    }

    calculate() {
        try {
            if (this.isBalancedParentheses()) {
                const result = this.evaluateExpression(this.expression);
                this.expression = result.toString();
            } else {
                this.expression = 'Erro nos Parênteses';
            }
        } catch (e) {
            this.expression = 'Erro';
        }
    }
    calculateExponential() {
        try {
            const result = Math.pow(eval(this.expression), 2);
            this.expression = result.toString();
        } catch (e) {
            this.expression = 'Erro';
        }
    }

    calculateSquareRoot() {
        try {
            const result = Math.sqrt(eval(this.expression));
            this.expression = result.toString();
        } catch (e) {
            this.expression = 'Erro';
        }
    }

    addPi() {
        this.expression += Math.PI.toString();
    }

    isBalancedParentheses(): boolean {
        const stack = [];
        for (const char of this.expression) {
            if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                if (stack.length === 0) {
                    return false;
                }
                stack.pop();
            }
        }
        return stack.length === 0;
    }

    addParentheses(open: boolean) {
        if (open) {
            this.expression += '(';
            this.stack.push('(');
        } else {
            if (this.stack.length > 0) {
                this.expression += ')';
                this.stack.pop();
            }
        }
    }
    toggleSign() {
        if (this.expression !== '') {
            if (this.expression.charAt(0) === '-') {
                this.expression = this.expression.slice(1);
            } else {
                this.expression = '-' + this.expression;
            }
        }
    }

    isOperation(character: string): boolean {
        return ['+', '-', '*', '/'].includes(character);
    }

    isLastCharacterAnOperation(): boolean {
        const lastChar = this.expression.charAt(this.expression.length - 1);
        return this.isOperation(lastChar);
    }

    evaluateExpression(expression: string): number {
        const regex = /(\d+\.?\d*)?([+\-*/])(\d+\.?\d*)/;
        while (regex.test(expression)) {
            expression = expression.replace(regex, (match, num1, operator, num2) => {
                const result = this.performOperation(parseFloat(num1), operator, parseFloat(num2));
                return result.toString();
            });
        }
        return parseFloat(expression);
    }

    calculatePercentage() {
        this.floatExpression = (parseFloat(this.expression)) / 100;
        this.expression = this.floatExpression.toString();
    }
    performOperation(num1: number, operator: string, num2: number): number {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                if (num2 !== 0) {
                    return num1 / num2;
                } else {
                    throw new Error('Divisão por zero');
                }
            default:
                throw new Error('Operador inválido');
        }
    }
}