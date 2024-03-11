// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		grid = parseInput(data),
		occupied = simulateSeating(grid);

	return occupied;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "11");

// Functions
type Point = { x: number; y: number };
type Seat = [number, number, string];

function parseInput(data: string) {
	return data.split("\r\n").map((row) => [...row]);
}
function getLayoutState(grid: string[][]) {
	const state: Seat[] = [];

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			state.push([x, y, grid[y][x]]);
		}
	}

	return JSON.stringify(state);
}
function getSeatState(location: Point, grid: string[][]) {
	const height = grid.length;
	const width = grid[0].length;

	let occupied = 0;
	let state = grid[location.y][location.x];

	for (let [nx, ny] of [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
		[1, 1],
		[1, -1],
		[-1, 1],
		[-1, -1],
	]) {
		const [x, y] = [nx + location.x, ny + location.y];

		if (x < 0 || x >= width || y < 0 || y >= height) continue;
		if (grid[y][x] === "#") occupied++;
	}

	if (state === "L" && !occupied) {
		return "#";
	}

	if (state === "#" && occupied >= 4) {
		return "L";
	}

	return state;
}
function scoreLayout(grid: string[][]) {
	let score = 0;

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			if (grid[y][x] === "#") score++;
		}
	}

	return score;
}
function simulateSeating(grid: string[][]) {
	let lastLayout = getLayoutState(grid);

	while (true) {
		let updates: Seat[] = [];

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[0].length; x++) {
				const currentState = grid[y][x];
				const nextState = getSeatState({ x, y }, grid);

				if (currentState !== nextState) {
					updates.push([x, y, nextState]);
				}
			}
		}

		for (const [x, y, state] of updates) {
			grid[y][x] = state;
		}

		const newLayout = getLayoutState(grid);

		if (newLayout === lastLayout) {
			return scoreLayout(grid);
		} else {
			lastLayout = newLayout;
			updates = [];
		}
	}
}
