// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ foodByAllergen, allFoods } = parseInput(data),
		dangerousIngridents = identifyDangerous(foodByAllergen),
		safe = identifyIngridents(dangerousIngridents, allFoods);

	return safe.length;
}
export function solveB(fileName: string, day: string): string {
	const data = TOOLS.readData(fileName, day),
		{ foodByAllergen, allFoods } = parseInput(data),
		dangerousIngridents = identifyDangerous(foodByAllergen);

	getDangerous(foodByAllergen, data);

	// getDangerousIngridentList(dangerousIngridents);

	return "";
}

//Run
solveB("example_b", "21");

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
function intersection(setA: Set<string>, setB: Set<string>) {
	return new Set([...setA].filter((element) => setB.has(element)));
}
function getDangerous(foodByAllergen: FoodByAllergen, data: string) {
	const allFoods = data.split("\r\n");
	const identified: Map<string, string> = new Map();

	while (identified.size < Object.keys(foodByAllergen).length) {
		for (const allergen of Object.keys(foodByAllergen)) {
			if (identified.has(allergen)) continue;

			let possible: Set<string> = new Set();

			for (let food of allFoods) {
				const [ingridentsList, allergens] = food.split(" (contains ");
				const ingridents = ingridentsList.split(" ");

				if (allergens.includes(allergen)) {
					if (possible.size === 0) {
						possible = new Set(ingridents);
					} else {
						const curentIngridents: Set<string> = new Set();

						for (const word of ingridents) {
							if (identified.has(word)) continue;
							else curentIngridents.add(word);
						}

						console.log(curentIngridents);
						possible = intersection(possible, curentIngridents);
					}
				}

				console.log(identified);
				console.log({ allergen }, possible);
			}

			if (possible.size === 1) {
				identified.set([...possible][0], allergen);
			}
		}
	}

	console.log(identified);

	// return identified;
}
function identifyIngridents(allergens: AllergenMap, allFoods: string[][]) {
	const safe: string[] = [];

	for (const food of allFoods) {
		for (const ingrident of food) {
			if (allergens.has(ingrident)) continue;
			else safe.push(ingrident);
		}
	}

	return safe;
}
function getDangerousIngridentList(allergens: AllergenMap) {
	console.log(allergens);

	const x = Array.from(allergens)
		.sort((a, b) => a[1].localeCompare(b[1]))
		.map(([ingrident, _]) => ingrident)
		.join(",");

	console.log(x);
}
