// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		{ tileCount } = runDirections(directions);

	return tileCount;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		{ tileState } = runDirections(directions),
		tileCount = simulateTileStates(tileState);

	return tileCount;
}

//Run
// solveB("example_b", "24");

// Functions
type Directions = string[][];
type TileState = Map<string, boolean>;
type Hexagon = [number, number, number];

function parseInput(data: string) {
	const directions: Directions = [];

	for (const line of data.split("\r\n")) {
		const moves = line.match(/se|sw|ne|nw|e|w/g) || [];
		directions.push(moves);
	}

	return directions;
}
function runDirections(allDirections: Directions) {
	const tileState: TileState = new Map();

	for (const directions of allDirections) {
		let [q, r, s]: Hexagon = [0, 0, 0];

		for (const move of directions) {
			switch (move) {
				case "e":
					[q, r, s] = [q + 1, r, s - 1];
					break;
				case "w":
					[q, r, s] = [q - 1, r, s + 1];
					break;
				case "ne":
					[q, r, s] = [q + 1, r - 1, s];
					break;
				case "nw":
					[q, r, s] = [q, r - 1, s + 1];
					break;
				case "se":
					[q, r, s] = [q, r + 1, s - 1];
					break;
				case "sw":
					[q, r, s] = [q - 1, r + 1, s];
					break;
				default:
					throw Error("Invalid direction");
			}
		}

		const key = `${q},${r},${s}`;
		tileState.set(key, tileState.has(key) ? !tileState.get(key) : false);
	}

	return { tileState, tileCount: blackTileCount(tileState) };
}
function blackTileCount(tileState: TileState): number {
	let blackTiles = 0;

	for (const [_, state] of tileState) {
		if (!state) blackTiles++;
	}

	return blackTiles;
}
function simulateTileStates(tileState: TileState, days: number = 10) {
	const updates: TileState = new Map();

	function getTileState(coord: string, currentState: boolean): boolean {
		const [q, r, s] = coord.split(",").map(Number);
		const neighours = [
			[1, 0, -1],
			[0, 1, -1],
			[-1, 1, 0],
			[-1, 0, 1],
			[0, -1, 1],
			[1, -1, 0],
		];

		let blackTiles = 0;

		for (const [nq, nr, ns] of neighours) {
			const key = `${q + nq},${r + nr},${s + ns}`;

			if (tileState.has(key) && !tileState.get(key)) {
				blackTiles++;
			} else {
				if (!currentState) tileState.set(key, true);
			}
		}

		if (currentState) {
			return blackTiles === 2 ? false : true;
		} else {
			return blackTiles === 0 || blackTiles > 2 ? true : false;
		}
	}

	for (let day = 1; day <= 100; day++) {
		for (const [coord, state] of tileState) {
			const newState = getTileState(coord, state);

			if (newState !== state) {
				updates.set(coord, newState);
			}
		}

		for (const [coord, state] of updates) {
			tileState.set(coord, state);
		}

		updates.clear();
	}

	return blackTileCount(tileState);
}
