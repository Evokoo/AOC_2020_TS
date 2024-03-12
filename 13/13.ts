// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		schedule = parseInput(data),
		result = findBus(schedule);

	return result;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "13");

// Functions
type Schedule = { target: number; buses: number[] };

function parseInput(data: string): Schedule {
	const details = data.split("\r\n");
	const target = +details[0];
	const buses = details[1]
		.split(",")
		.filter((el) => el !== "x")
		.map(Number);

	return { target, buses };
}
function findBus(schedule: Schedule) {
	const optimalBus = { ID: 0, wait: Infinity };

	for (let bus of schedule.buses) {
		const depature = Math.ceil(schedule.target / bus) * bus;
		const wait = depature - schedule.target;

		if (wait < optimalBus.wait) {
			optimalBus.ID = bus;
			optimalBus.wait = wait;
		}
	}

	return optimalBus.ID * optimalBus.wait;
}
