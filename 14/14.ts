// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		updates = parseInput(data),
		sum = runUpdates(updates);

	return sum;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "14");

// Functions
type Update = [number, string];

function parseInput(data: string) {
	const updates: Update[] = [];

	let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

	for (const line of data.split("\r\n")) {
		if (line.startsWith("mask")) {
			mask = line.slice(7);
		} else {
			const [address, value] = (line.match(/\d+/g) || []).map(Number);

			let bit = [...value.toString(2).padStart(36, "0")];

			for (let i = 0; i < bit.length; i++) {
				const maskValue = mask[i];

				if (maskValue !== "X") {
					bit[i] = maskValue;
				}
			}

			updates.push([address, bit.join("")]);
		}
	}

	return updates;
}
function runUpdates(updates: Update[]) {
	const memory: Map<number, string> = new Map();

	for (let [address, value] of updates) {
		memory.set(address, value);
	}

	let sum = 0;

	for (let [_, value] of memory) {
		sum += parseInt(value, 2);
	}

	return sum;
}
