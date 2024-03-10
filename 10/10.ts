// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		adapters = parseInput(data),
		result = useAdapters(adapters);

	return result;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		adapters = parseInput(data),
		combinations = arrangeAdapters(adapters);

	return combinations;
}

//Run
solveB("example_b", "10");

// Functions
function parseInput(data: string) {
	const adapters = data
		.split("\r\n")
		.map(Number)
		.sort((a, b) => a - b);

	return adapters.concat(Math.max(...adapters) + 3);
}
function useAdapters(adapters: number[]) {
	const joltDifference = [0, 0, 0];

	let jolts = 0;

	for (let adapter of adapters) {
		joltDifference[adapter - jolts - 1]++;
		jolts = adapter;
	}

	return joltDifference[0] * joltDifference[2];
}
function arrangeAdapters(adapters: number[]) {
	adapters.unshift(0);

	const arrangments: number[] = new Array(adapters.length).fill(0);

	arrangments[0] = 1;

	for (let i = 1; i < adapters.length; i++) {
		for (let j = i - 1; j >= 0 && adapters[i] - adapters[j] <= 3; j--) {
			arrangments[i] += arrangments[j];
		}
	}

	return arrangments[adapters.length - 1];
}
