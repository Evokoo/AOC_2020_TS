// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		grid = parseInput(data),
		trees = checkPath(grid, { x: 3, y: 1 });

	return trees;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		grid = parseInput(data),
		slopes = [
			{ x: 1, y: 1 },
			{ x: 3, y: 1 },
			{ x: 5, y: 1 },
			{ x: 7, y: 1 },
			{ x: 1, y: 2 },
		],
		result = slopes.reduce(
			(product, slope) => product * checkPath(grid, slope),
			1
		);

	return result;
}

//Run
solveB("example_b", "03");

// Functions
type XY = { x: number; y: number };

function parseInput(data: string) {
	return data.split("\r\n");
}
function checkPath(grid: string[], slope: XY) {
	const height = grid.length;
	const width = grid[0].length;
	const path: XY = { x: 0, y: 0 };

	let trees = 0;

	while (true) {
		path.y += slope.y;
		path.x += slope.x;

		if (path.y < height) {
			if (grid[path.y][path.x % width] === "#") trees++;
		} else {
			break;
		}
	}

	return trees;
}
