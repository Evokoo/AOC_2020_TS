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
	const data = TOOLS.readData(fileName, day),
		updates = parseInput(data),
		sum = runUpdatesV2(updates);

	return sum;
}

//Run
solveB("example_b", "14");

// Functions
type Update = [number, string, string];

function parseInput(data: string) {
	const updates: Update[] = [];

	let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

	for (const line of data.split("\r\n")) {
		if (line.startsWith("mask")) {
			mask = line.slice(7);
		} else {
			const [address, value] = (line.match(/\d+/g) || []).map(Number);
			const bit = [...toBinary(value)];

			updates.push([address, mask, bit.join("")]);
		}
	}

	return updates;
}
function toBinary(n: number) {
	return n.toString(2).padStart(36, "0");
}
function runUpdates(updates: Update[]) {
	const memory: Map<number, string> = new Map();

	function applyMask(value: string, mask: string) {
		let bit = [...value];

		for (let i = 0; i < bit.length; i++) {
			const maskValue = mask[i];

			if (maskValue !== "X") {
				bit[i] = maskValue;
			}
		}

		return bit.join("");
	}

	for (let [address, mask, value] of updates) {
		memory.set(address, applyMask(value, mask));
	}

	let sum = 0;

	for (let [_, value] of memory) {
		sum += parseInt(value, 2);
	}

	return sum;
}
function runUpdatesV2(updates: Update[]) {
	const memory: Map<number, string> = new Map();

	function getAddresses(value: string, mask: string) {
		let bit = [...value];

		for (let i = 0; i < bit.length; i++) {
			const maskValue = mask[i];

			switch (maskValue) {
				case "1":
					bit[i] = "1";
					break;
				case "X":
					bit[i] = "X";
					break;
				case "0":
					break;
				default:
					throw Error("Invalid bit");
			}
		}

		function generateCombinations(n: number) {
			const combinations: string[] = [];
			for (let i = 0; i < Math.pow(2, n); i++) {
				let binary: string = i.toString(2).padStart(n, "0");
				combinations.push(binary);
			}
			return combinations;
		}

		function findAllCombinations(bitString: string) {
			const xCount = (bitString.match(/X/g) || []).length;
			const combinations = generateCombinations(xCount);

			const results: string[] = [];
			combinations.forEach((combination) => {
				let result: string = bitString;
				for (let i = 0; i < xCount; i++) {
					result = result.replace("X", combination[i]);
				}
				results.push(result);
			});

			return results;
		}

		return findAllCombinations(bit.join(""));
	}

	for (let [initialAddress, mask, value] of updates) {
		const addresses = getAddresses(toBinary(initialAddress), mask);

		for (let address of addresses) {
			memory.set(parseInt(address, 2), value);
		}
	}

	let sum = 0;

	for (let [_, value] of memory) {
		sum += parseInt(value, 2);
	}

	return sum;
}
