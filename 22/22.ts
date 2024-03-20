// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		players = parseInput(data),
		score = playCombat(players);

	return score;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "22");

// Functions
type Players = [number[], number[]];

function parseInput(data: string) {
	return data.split(/\r\n\s*\r\n/).map((player) => {
		return player.split("\r\n").slice(1).map(Number);
	}) as Players;
}
function playCombat([p1, p2]: Players) {
	let winner: number[];

	while (true) {
		const cardA = p1.shift()!;
		const cardB = p2.shift()!;

		if (cardA > cardB) {
			p1 = [...p1, cardA, cardB];
		} else if (cardB > cardA) {
			p2 = [...p2, cardB, cardA];
		} else {
			p1.push(cardA);
			p2.push(cardB);
		}

		if (p1.length === 0) {
			winner = p2;
			break;
		}

		if (p2.length === 0) {
			winner = p1;
			break;
		}
	}

	const len = winner.length;
	const score = winner.reduce((acc, cur, i) => acc + cur * (len - i), 0);

	return score;
}
