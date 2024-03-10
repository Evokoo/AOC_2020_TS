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
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "10");

// Functions
type Chain = {
	adapters: number[];
	index: number;
	step: Record<string, number>;
};

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
