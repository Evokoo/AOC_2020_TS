// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		bags = parseInput(data),
		validBags = findBags(bags, "shiny gold");

	return validBags.size;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "07");

// Functions
type Bag = { style: string; quantity: number };

function parseInput(data: string) {
	const bags: Map<string, Bag[]> = new Map();

	for (let rule of data.split("\r\n")) {
		const allBags = rule.match(/\w+ \w+(?= bags*)/g) || [];
		const bagQuantities = rule.match(/\d+/g) || [];

		const style = allBags.shift()!;
		const contains = allBags
			.filter((bag) => !bag.startsWith("no"))
			.map((bag, i) => ({
				style: bag,
				quantity: +bagQuantities[i],
			}));

		bags.set(style, contains);
	}

	return bags;
}
function findBags(bags: Map<string, Bag[]>, target: string) {
	const valid: Set<string> = new Set();

	for (let [style, innerBags] of bags) {
		if (style === target) continue;

		const queue = innerBags;

		while (queue.length) {
			const current = queue.pop()!;

			if (current.style === target || valid.has(current.style)) {
				valid.add(style);
				continue;
			}

			for (const inner of bags.get(current.style) ?? []) {
				if (inner.style === target) {
					valid.add(style);
					continue;
				} else {
					queue.push(inner);
				}
			}
		}
	}

	return valid;
}
