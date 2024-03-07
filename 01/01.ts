// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		values = parseInput(data);

	return twoSum(values, 2020);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		values = parseInput(data);

	return threeSum(values, 2020);
}

//Run
solveA("example_a", "01");

// Functions
function parseInput(data: string) {
	return data.split("\r\n").map(Number);
}
function twoSum(values: number[], target: number) {
	const memo: Map<number, number> = new Map();

	for (let value of values) {
		const comlpiment = target - value;

		if (memo.has(comlpiment)) {
			return comlpiment * value;
		} else {
			memo.set(value, comlpiment);
		}
	}

	throw Error("Pair not found");
}
function threeSum(values: number[], target: number) {}
