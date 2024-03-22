// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		tileCount = runDirections(directions);

	return tileCount.black;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "24");

// Functions
type Directions = string[][];
type Hexagon = { q: number; r: number };

function parseInput(data: string) {
	const directions: Directions = [];

	for (const line of data.split("\r\n")) {
		const moves = line.match(/se|sw|ne|nw|e|w/g) || [];
		directions.push(moves);
	}

	return directions;
}

function runDirections(allDirections: Directions) {
	const tileState: Map<string, boolean> = new Map();

	for (const directions of allDirections) {
		const position: Hexagon = { q: 0, r: 0 };

		for (const move of directions) {
			switch (move) {
				case "e":
					position.q += 1;
					break;
				case "w":
					position.q -= 1;
					break;
				case "ne":
					position.q += 1;
					position.r -= 1;
					break;
				case "nw":
					position.r -= 1;
					break;
				case "se":
					position.r += 1;
					break;
				case "sw":
					position.q -= 1;
					position.r += 1;
					break;
				default:
					throw Error("Invalid direction");
			}
		}

		const key = `${position.q},${position.r}`;
		tileState.set(key, tileState.has(key) ? !tileState.get(key) : false);
	}

	const tileCount = { black: 0, white: 0 };

	for (const [_, value] of tileState) {
		value ? tileCount.white++ : tileCount.black++;
	}

	return tileCount;
}
