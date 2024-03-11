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
	const data = TOOLS.readData(fileName, day),
		grid = parseInput(data),
		occupied = simulateSeating(grid, true);

	return occupied;
}

//Run
solveB("example_b", "11");

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
function getSeatStateBySight(location: Point, grid: string[][]) {
	const height = grid.length;
	const width = grid[0].length;
	const directions = new Map([
		["N", { x: location.x, y: location.y, search: true }],
		["S", { x: location.x, y: location.y, search: true }],
		["E", { x: location.x, y: location.y, search: true }],
		["W", { x: location.x, y: location.y, search: true }],
		["NE", { x: location.x, y: location.y, search: true }],
		["NW", { x: location.x, y: location.y, search: true }],
		["SE", { x: location.x, y: location.y, search: true }],
		["SW", { x: location.x, y: location.y, search: true }],
	]);

	let occupied = 0;

	while (directions.size) {
		for (const [direction, { x, y, search }] of directions) {
			let [nx, ny] = [x, y];

			switch (direction) {
				case "N":
					[nx, ny] = [nx, ny - 1];
					break;
				case "S":
					[nx, ny] = [nx, ny + 1];
					break;
				case "W":
					[nx, ny] = [nx - 1, ny];
					break;
				case "E":
					[nx, ny] = [nx + 1, ny];
					break;
				case "NE":
					[nx, ny] = [nx + 1, ny - 1];
					break;
				case "NW":
					[nx, ny] = [nx - 1, ny - 1];
					break;
				case "SE":
					[nx, ny] = [nx + 1, ny + 1];
					break;
				case "SW":
					[nx, ny] = [nx - 1, ny + 1];
					break;
				default:
					throw Error("Invalid Direction");
			}

			if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
				directions.delete(direction);
				continue;
			}

			if (grid[ny][nx] === ".") {
				directions.set(direction, { x: nx, y: ny, search: true });
				continue;
			}

			if (grid[ny][nx] === "#") {
				occupied++;
				directions.delete(direction);
				continue;
			}

			if (grid[ny][nx] === "L") {
				directions.delete(direction);
				continue;
			}
		}
	}

	let state = grid[location.y][location.x];

	if (state === "L" && !occupied) {
		return "#";
	}
	if (state === "#" && occupied >= 5) {
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
function simulateSeating(grid: string[][], partB: boolean = false) {
	let lastLayout = getLayoutState(grid);

	while (true) {
		let updates: Seat[] = [];

		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[0].length; x++) {
				const currentState = grid[y][x];

				if (currentState === ".") continue;

				const nextState = partB
					? getSeatStateBySight({ x, y }, grid)
					: getSeatState({ x, y }, grid);

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

//Debug
function printGrid(grid: string[][]): void {
	const img = grid.map((row) => row.join("")).join("\n");

	console.log(img + "\n");
}
