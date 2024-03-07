// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		policyTests = parseInput(data),
		validList = validatePasswords(policyTests, "A");

	return validList.size;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		policyTests = parseInput(data),
		validList = validatePasswords(policyTests, "B");

	return validList.size;
}

//Run
solveB("example_b", "02");

// Functions
type Policy = { character: string; min: number; max: number };
type PolicyTest = { policy: Policy; password: string };

function parseInput(data: string) {
	const policyTests: PolicyTest[] = [];

	for (let line of data.split("\r\n")) {
		const [range, character, password] = line.split(" ");
		const [min, max] = range.split("-");

		const policy = {
			character: character[0],
			min: +min,
			max: +max,
		};

		policyTests.push({ policy, password });
	}

	return policyTests;
}
function validatePasswords(policyTests: PolicyTest[], method: string) {
	const valid: Set<string> = new Set();

	if (method === "A") {
		for (let test of policyTests) {
			const target = test.policy.character;
			const count = [...test.password].reduce(
				(acc, cur) => acc + (cur === target ? 1 : 0),
				0
			);

			if (count >= test.policy.min && count <= test.policy.max) {
				valid.add(test.password);
			}
		}

		return valid;
	}

	if (method === "B") {
		for (let test of policyTests) {
			const target = test.policy.character;
			const a = test.password[test.policy.min - 1] === target;
			const b = test.password[test.policy.max - 1] === target;

			if (a !== b) {
				valid.add(test.password);
			}
		}

		return valid;
	}

	throw Error("Invalid validation method");
}
