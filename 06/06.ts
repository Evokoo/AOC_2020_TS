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
	const data = TOOLS.readData(fileName, day),
		groups = parseInput(data),
		score = scoreGroups(groups, true);

	return score;
}

//Run
solveB("example_b", "06");

// Functions
function parseInput(data: string) {
	const groups: string[][] = [];

	for (let group of data.split(/\s*\r\n\s+/g)) {
		const responses = group.split("\r\n");
		groups.push(responses);
	}

	return groups;
}
function scoreGroups(groups: string[][], partB: boolean = false) {
	let score: number = 0;

	for (const group of groups) {
		const groupSize = group.length;
		const questionScore: Record<string, number> = {};

		for (const response of group) {
			for (const answer of [...response]) {
				questionScore[answer] = (questionScore[answer] ?? 0) + 1;
			}
		}

		for (const qScore of Object.values(questionScore)) {
			if (partB) {
				if (qScore === groupSize) score++;
			} else {
				if (qScore >= 1) score++;
			}
		}
	}

	return score;
}
