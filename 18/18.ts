// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		equations = parseInput(data),
		sum = equations.reduce(
			(total, equation) => total + +solveEquation(equation),
			0
		);

	return sum;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		equations = parseInput(data),
		sum = equations.reduce(
			(total, equation) => total + +solveEquation(equation, true),
			0
		);

	console.log(sum);

	return sum;
}

//Run
solveB("example_b", "18");

// Functions
function parseInput(data: string) {
	return data.split("\r\n");
}
function solver(a: number, op: string, b: number): string {
	switch (op) {
		case "+":
			return String(a + b);
		case "*":
			return String(a * b);
		default:
			throw Error("Invalid operator");
	}
}
function solveEquation(equation: string, isAdvanced: boolean = false) {
	const basic = /(\d+) ([+*]) (\d+)/;
	const braces = /\([\d\s+*]+\)/;

	if (braces.test(equation)) {
		const eq = equation.replace(/\(([\d\s+*]+)\)/, (_, $) => {
			return solveEquation($, isAdvanced);
		});
		return solveEquation(eq, isAdvanced);
	} else if (basic.test(equation)) {
		if (isAdvanced) {
			const addtion = /(\d+) (\+) (\d+)/;
			const multiply = /(\d+) (\*) (\d+)/;

			if (addtion.test(equation)) {
				const eq = equation.replace(addtion, (_, a, op, b) =>
					solver(+a, op, +b)
				);
				return solveEquation(eq, isAdvanced);
			} else {
				const eq = equation.replace(multiply, (_, a, op, b) =>
					solver(+a, op, +b)
				);
				return solveEquation(eq, isAdvanced);
			}
		} else {
			const eq = equation.replace(basic, (_, a, op, b) => solver(+a, op, +b));
			return solveEquation(eq, isAdvanced);
		}
	}

	return equation;
}
