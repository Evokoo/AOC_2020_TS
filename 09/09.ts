// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		numbers = parseInput(data),
		targetNumber = slidingTwoSum(numbers, fileName.startsWith("e") ? 5 : 25);

	return targetNumber;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "09");

// Functions
function parseInput(data: string) {
	return data.split("\r\n").map(Number);
}
function slidingTwoSum(numbers: number[], window: number) {
	let numberWindow = numbers.slice(0, window);

	outer: for (let i = window; i < numbers.length; i++) {
		const target = numbers[i];
		const memo: Map<number, number> = new Map();

		for (let number of numberWindow) {
			const comlpiment = target - number;

			if (memo.has(comlpiment)) {
				numberWindow = [...numberWindow.slice(1), target];
				continue outer;
			} else {
				memo.set(number, comlpiment);
			}
		}

		return target;
	}

	throw Error("Number not found");
}
