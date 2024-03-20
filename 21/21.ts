// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ food, allergens } = parseInput(data),
		dangerousIngridents = identifyDangerous(food, allergens),
		safeIngridents = identifySafe(food, dangerousIngridents);

	return safeIngridents.length;
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		{ food, allergens } = parseInput(data),
		dangerousIngridents = identifyDangerous(food, allergens);

	return getDangerousList(dangerousIngridents);
}

//Run
solveB("input", "21");

// Functions
type Food = { ingridents: string[]; allergens: string[] };
type Dangerous = Map<string, string>;

function parseInput(data: string) {
	const food: Food[] = [];
	const allergens: Set<string> = new Set();

	for (const listing of data.split("\r\n")) {
		const sections = listing.split(" (contains");
		const ingridentList = sections[0].split(" ");
		const allergenList = sections[1].match(/\w+/g) || [];

		food.push({ ingridents: ingridentList, allergens: allergenList });

		for (const allergen of allergenList) {
			allergens.add(allergen);
		}
	}

	food.sort((a, b) => a.allergens.length - b.allergens.length);

	return { food, allergens };
}
function identifyDangerous(foods: Food[], allergenList: Set<string>) {
	const identified: Map<string, string> = new Map();
	const found: Set<string> = new Set();

	while (identified.size < allergenList.size) {
		for (const allergen of allergenList) {
			if (found.has(allergen)) {
				continue;
			}

			let possible: Set<string> = new Set();

			for (const { ingridents, allergens } of foods) {
				const unknownIngridents = ingridents.filter(
					(ingrident) => !identified.has(ingrident)
				);

				if (allergens.includes(allergen)) {
					if (possible.size === 0) {
						possible = new Set(unknownIngridents);
					} else {
						possible = intersection(possible, new Set(unknownIngridents));
					}
				}
			}

			console.log(allergen, possible);

			if (possible.size === 1) {
				identified.set([...possible][0], allergen);
				found.add(allergen);
			}
		}
	}

	return identified;
}
function identifySafe(foods: Food[], dangerousIngridents: Dangerous) {
	const safeIngridents: string[] = [];

	for (const { ingridents } of foods) {
		for (const ingrident of ingridents) {
			if (dangerousIngridents.has(ingrident)) {
				continue;
			} else {
				safeIngridents.push(ingrident);
			}
		}
	}

	return safeIngridents;
}
function getDangerousList(dangerousIngridents: Dangerous) {
	console.log(dangerousIngridents);

	return Array.from(dangerousIngridents)
		.sort((a, b) => a[1].localeCompare(b[1]))
		.map(([ingrident, _]) => ingrident)
		.join(",");
}

// Set functions
function intersection(setA: Set<string>, setB: Set<string>) {
	return new Set([...setA].filter((element) => setB.has(element)));
}
