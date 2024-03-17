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
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "18");

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
function solveEquation(equation: string) {
	const basic = /(\d+) ([+*]) (\d+)/;
	const braces = /\([\d\s+*]+\)/;

	if (braces.test(equation)) {
		const eq = equation.replace(/\(([\d\s+*]+)\)/, (_, $) => {
			return solveEquation($);
		});
		return solveEquation(eq);
	} else if (basic.test(equation)) {
		const eq = equation.replace(basic, (_, a, op, b) => solver(+a, op, +b));
		return solveEquation(eq);
	}

	return equation;
}
