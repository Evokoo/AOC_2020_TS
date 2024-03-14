// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		numbers = parseInput(data),
		number = playGame(numbers, 2020);

	return number;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		numbers = parseInput(data),
		number = playGame(numbers, 30000000);

	return number;
}

//Run
// solveB("example_b", "15");

// Functions
function parseInput(data: string) {
	return data.split(",").map(Number);
}
function playGame(numbers: number[], target: number) {
	const record: Map<number, number[]> = new Map();

	for (let turn = 1, last = 0; true; turn++) {
		let number = 0;

		if (numbers.length) {
			number = numbers.shift()!;
		} else {
			const history = record.get(last)!;

			if (history.length === 1) {
				number = 0;
			} else {
				const [a, b] = history;
				number = b - a;
			}
		}

		record.set(number, [...(record.get(number) ?? []).slice(-1), turn]);
		last = number;

		if (turn === target) {
			console.log(number);
			return number;
		}
	}

	throw Error("Something went wrong");
}
