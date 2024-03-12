// Imports
import TOOLS from "../00/tools";
import { Ship } from "./Ship";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		distance = navigateShip(directions);

	return distance;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		directions = parseInput(data),
		distance = navigateShip(directions, true);

	return distance;
}

//Run
solveB("example_b", "12");

// Functions
type Direction = { command: string; amount: number };

function parseInput(data: string) {
	const directions: Direction[] = [];

	for (let line of data.split("\r\n")) {
		const [command, amount] = [line[0], +line.slice(1)];
		directions.push({ command, amount });
	}

	return directions;
}
function navigateShip(directions: Direction[], follow: boolean = false) {
	const ship = new Ship(0, 0, 90, { x: 10, y: 1 });

	for (const { command, amount } of directions) {
		ship.update(command, amount, follow);
	}

	return TOOLS.manhattanDistance(ship.position, { x: 0, y: 0 });
}
