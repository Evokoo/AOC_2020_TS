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
	const data = TOOLS.readData(fileName, day),
		{ cubes, xMax, yMax } = parseInput(data),
		active = runSimulation(cubes, xMax, yMax, 6, true);

	return active;
}

//Run
// solveB("input", "17");

// Functions
type Point = { x: number; y: number; z: number; w: number };
type Cubes = Map<string, boolean>;
type Range = { min: number; max: number };

function parseInput(data: string) {
	const cubes: Map<string, boolean> = new Map();
	const rows: string[] = data.split("\r\n");

	for (let y = 0; y < rows.length; y++) {
		for (let x = 0; x < rows[0].length; x++) {
			if (rows[y][x] === "#") {
				cubes.set(`${x},${y},${0},${0}`, true);
			}
		}
	}

	return { cubes, xMax: rows[0].length, yMax: rows.length };
}
function getState(
	point: Point,
	isActive: boolean,
	neighours: number[][],
	cubes: Cubes
) {
	let activeCount = 0;

	for (const [nx, ny, nz, nw] of neighours) {
		const [x, y, z, w] = [
			point.x + nx,
			point.y + ny,
			point.z + nz,
			point.w + nw,
		];
		const coord = `${x},${y},${z},${w}`;
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
function generateNeigbours(fourthDimension: boolean = false) {
	const neighboringPoints: number[][] = [];
	const wIndex = fourthDimension ? { min: -1, max: 1 } : { min: 0, max: 0 };

	for (let w = wIndex.min; w <= wIndex.max; w++) {
		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				for (let z = -1; z <= 1; z++) {
					if (x === 0 && y === 0 && z === 0 && w === 0) {
						continue;
					} else {
						neighboringPoints.push([x, y, z, w]);
					}
				}
			}
		}
	}

	return neighboringPoints;
}
function runSimulation(
	cubes: Cubes,
	xMax: number,
	yMax: number,
	cycles: number,
	fourthDimension: boolean = false
) {
	const updates: Cubes = new Map();
	const neighboringPoints = generateNeigbours(fourthDimension);
	const zIndex: Range = { min: -1, max: 1 };
	const xIndex: Range = { min: -1, max: xMax };
	const yIndex: Range = { min: -1, max: yMax };
	const wIndex = fourthDimension ? { min: -1, max: 1 } : { min: 0, max: 0 };

	for (let cycle = 0; cycle < cycles; cycle++) {
		for (let w = wIndex.min; w <= wIndex.max; w++) {
			for (let z = zIndex.min; z <= zIndex.max; z++) {
				for (let y = yIndex.min; y <= yIndex.max; y++) {
					for (let x = xIndex.min; x <= xIndex.max; x++) {
						const coord = `${x},${y},${z},${w}`;
						const currentState = cubes.get(coord) ?? false;
						const newState = getState(
							{ x, y, z, w },
							currentState,
							neighboringPoints,
							cubes
						);

						if (currentState === newState) {
							continue;
						} else {
							updates.set(coord, newState);
						}
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

		if (fourthDimension) {
			wIndex.max++;
			wIndex.min--;
		}
	}

	let totalActive = 0;

	for (const [_, isActive] of cubes) {
		totalActive += isActive ? 1 : 0;
	}

	return totalActive;
}
