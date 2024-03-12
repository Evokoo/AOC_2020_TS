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
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "12");

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
function navigateShip(directions: Direction[]) {
	const ship = new Ship(0, 0, 90);

	for (const { command, amount } of directions) {
		ship.update(command, amount);
	}

	return TOOLS.manhattanDistance(ship.position, { x: 0, y: 0 });
}
