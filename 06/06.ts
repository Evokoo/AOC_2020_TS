// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		groups = parseInput(data),
		score = scoreGroups(groups);

	return score;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "06");

// Functions
function parseInput(data: string) {
	const groups: string[][] = [];

	for (let group of data.split(/\s*\r\n\s+/g)) {
		const responses = group.split("\r\n");
		groups.push(responses);
	}

	return groups;
}
function scoreGroups(groups: string[][]) {
	let score: number = 0;

	for (const group of groups) {
		const answeredYes: Set<string> = new Set();

		for (const response of group) {
			for (const answer of [...response]) {
				answeredYes.add(answer);
			}
		}

		score += answeredYes.size;
	}

	return score;
}
