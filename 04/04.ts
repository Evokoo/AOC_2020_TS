// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		passports = parseInput(data),
		validPassports = validateFields(passports);

	return validPassports.length;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		passports = parseInput(data),
		validPassports = validateDetails(validateFields(passports));

	return 0;
}

//Run
solveB("example_b", "04");

// Functions
type Passport = { [key: string]: string };

function parseInput(data: string) {
	const passports: Passport[] = [];

	for (let group of data.split("\r\n\r\n")) {
		const passport: Passport = {};
		const lines = group.split("\r\n");

		for (const line of lines) {
			const sections = line.split(" ");

			for (let section of sections) {
				const [key, value] = section.split(":");
				passport[key] = value;
			}
		}

		passports.push(passport);
	}

	return passports;
}
function validateFields(passports: Passport[]) {
	const valid: Passport[] = [];
	const validKeys: Set<string> = new Set([
		"byr",
		"iyr",
		"eyr",
		"hgt",
		"hcl",
		"ecl",
		"pid",
		"cid",
	]);

	for (let passport of passports) {
		const keys = Object.keys(passport);
		const score = keys.reduce(
			(acc, cur) => acc + (validKeys.has(cur) ? 1 : 0),
			0
		);

		if (score === 8 || (score === 7 && !keys.includes("cid"))) {
			valid.push(passport);
		}
	}

	return valid;
}
function validateDetails(passports: Passport[]) {
	const valid = [];

	for (let passport of passports) {
		const [key, value] = Object.entries(passport);

		console.log(key, value);
	}
}
