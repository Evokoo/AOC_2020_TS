// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ foodByAllergen, allFoods } = parseInput(data),
		dangerous = identifyDangerous(foodByAllergen),
		safe = identifySafe(dangerous, allFoods);

	return safe.length;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "21");

// Functions
type FoodByAllergen = Record<string, string[][]>;
type AllergenMap = Map<string, string>;

function parseInput(data: string) {
	const foodByAllergen: FoodByAllergen = {};
	const allFoods: string[][] = [];

	for (const listing of data.split("\r\n")) {
		const [ingridents, allergens] = listing.split(" (contains");
		const ingridentList = ingridents.split(" ");

		allFoods.push(ingridentList);

		for (const key of allergens.match(/\w+/g) || []) {
			foodByAllergen[key] = [...(foodByAllergen[key] ?? []), ingridentList];
		}
	}

	return { foodByAllergen, allFoods };
}
function identifyDangerous(foodByAllergen: FoodByAllergen) {
	const identified: Map<string, string> = new Map();

	for (let allergen of Object.keys(foodByAllergen)) {
		const ingridentLists = foodByAllergen[allergen];
		const toCheck = ingridentLists.slice(1);

		for (let word of ingridentLists[0]) {
			if (identified.has(word)) continue;

			if (toCheck.every((list) => list.includes(word))) {
				identified.set(word, allergen);
			}
		}
	}

	return identified;
}
function identifySafe(allergens: AllergenMap, allFoods: string[][]) {
	const safe: string[] = [];

	for (const food of allFoods) {
		for (const ingrident of food) {
			if (allergens.has(ingrident)) continue;
			else safe.push(ingrident);
		}
	}

	return safe;
}
