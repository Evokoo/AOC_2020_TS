// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ cubes, xMax, yMax } = parseInput(data),
		active = runSimulation(cubes, xMax, yMax, 6);

	return active;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "17");

// Functions
type XYZ = { x: number; y: number; z: number };
type Cubes = Map<string, boolean>;
type Range = { min: number; max: number };

function parseInput(data: string) {
	const cubes: Map<string, boolean> = new Map();
	const rows: string[] = data.split("\r\n");

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[0].length; x++) {
			if (rows[y][x] === "#") {
				cubes.set(`${x},${y},${0}`, true);
			}
		}
	}

	return { cubes, xMax: rows[0].length, yMax: rows.length };
}
function getState(point: XYZ, isActive: boolean, cubes: Cubes) {
	let activeCount = 0;

	const neighboringPoints = [
		[1, 0, 0],
		[-1, 0, 0],
		[0, 1, 0],
		[0, -1, 0],
		[1, 1, 0],
		[1, -1, 0],
		[-1, 1, 0],
		[-1, -1, 0],
		[0, 0, -1],
		[1, 0, -1],
		[-1, 0, -1],
		[0, 1, -1],
		[0, -1, -1],
		[1, 1, -1],
		[1, -1, -1],
		[-1, 1, -1],
		[-1, -1, -1],
		[0, 0, 1],
		[1, 0, 1],
		[-1, 0, 1],
		[0, 1, 1],
		[0, -1, 1],
		[1, 1, 1],
		[1, -1, 1],
		[-1, 1, 1],
		[-1, -1, 1],
	];

	for (const [nx, ny, nz] of neighboringPoints) {
		const [x, y, z] = [point.x + nx, point.y + ny, point.z + nz];
		const coord = `${x},${y},${z}`;
		const neighbourIsActive = cubes.get(coord) ?? false;

		if (neighbourIsActive) {
			activeCount++;
		}
	}

	if (isActive) {
		return activeCount === 2 || activeCount === 3;
	}

	if (!isActive) {
		return activeCount === 3;
	}

	throw Error("Something went wrong");
}
function runSimulation(
	cubes: Cubes,
	xMax: number,
	yMax: number,
	cycles: number
) {
	const updates: Cubes = new Map();
	const zIndex: Range = { min: -1, max: 1 };
	const xIndex: Range = { min: -1, max: xMax };
	const yIndex: Range = { min: -1, max: yMax };

	for (let cycle = 0; cycle < cycles; cycle++) {
		for (let z = zIndex.min; z <= zIndex.max; z++) {
			for (let y = yIndex.min; y <= yIndex.max; y++) {
				for (let x = xIndex.min; x <= xIndex.max; x++) {
					const coord = `${x},${y},${z}`;
					const currentState = cubes.get(coord) ?? false;
					const newState = getState({ x, y, z }, currentState, cubes);

					if (currentState === newState) {
						continue;
					} else {
						updates.set(coord, newState);
					}
				}
			}
		}

		for (const [coord, isActive] of updates) {
			if (isActive) {
				cubes.set(coord, isActive);
			} else {
				cubes.delete(coord);
			}
		}

		updates.clear();
		zIndex.max++;
		zIndex.min--;
		xIndex.max++;
		xIndex.min--;
		yIndex.max++;
		yIndex.min--;
	}

	let totalActive = 0;

	for (const [_, isActive] of cubes) {
		totalActive += isActive ? 1 : 0;
	}

	return totalActive;
}
