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

	return validPassports.length;
}

//Run
solveB("input", "04");

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
	const valid: Passport[] = [];

	function isValidYear(
		year: string | undefined,
		min: number,
		max: number
	): boolean {
		if (!year) return false;
		return +year >= min && +year <= max;
	}
	function isValidHeight(height: string | undefined): boolean {
		if (!height) return false;

		const [_, measure, unit] = height.match(/(\d+)(\w+)/) || [];

		if (unit === "cm") {
			return +measure >= 150 && +measure <= 193;
		}

		if (unit === "in") {
			return +measure >= 59 && +measure <= 76;
		}

		return false;
	}
	function isValidHairColour(colour: string | undefined): boolean {
		if (!colour) return false;
		return /^#[a-f0-9]{6}$/.test(colour.trim());
	}
	function isValidEyeColour(colour: string | undefined): boolean {
		if (!colour) return false;
		return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
			colour.trim()
		);
	}
	function isValidPID(pid: string | undefined): boolean {
		if (!pid) return false;
		return /^\d{9}$/.test(pid);
	}

	for (let passport of passports) {
		const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;

		if (
			isValidYear(byr, 1920, 2002) &&
			isValidYear(iyr, 2010, 2020) &&
			isValidYear(eyr, 2020, 2030) &&
			isValidHeight(hgt) &&
			isValidHairColour(hcl) &&
			isValidEyeColour(ecl) &&
			isValidPID(pid)
		) {
			valid.push(passport);
		}
	}

	return valid;
}
