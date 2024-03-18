// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ rule, msgs } = parseInput(data),
		valid = msgs.filter((msg) => rule.test(msg));

	return valid.length;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ rule, msgs } = parseInput(data, true),
		valid = msgs.filter((msg) => rule.test(msg));

	console.log(valid);

	return valid.length;
}

//Run
solveB("example_b", "19");

// Functions
function parseInput(data: string, updateRules: boolean = false) {
	const ruleset: Map<string, string> = new Map();

	const [rules, msgs] = data
		.split(/\r\n\s*\r\n/)
		.map((section) => section.split("\r\n"));

	while (rules.length) {
		const current = rules.shift()!;

		if (updateRules) {
			if (current === "8: 42") {
				rules.push("8: 42 | 42 8");
				continue;
			}
			if (current === "11: 42 31") {
				rules.push("11: 42 31 | 42 11 31");
				continue;
			}
		}

		const [key, rule] = current.split(":");

		if (/[ab]/.test(rule)) {
			ruleset.set(key, rule.match(/[ab]/)![0]);
			continue;
		} else {
			const digits = rule.match(/\d+/g) || [];

			if (digits.every((digit) => ruleset.has(digit))) {
				ruleset.set(
					key,
					`(${rule
						.replace(/\d+/g, ($) => ruleset.get($)!)
						.replace(/\s+/g, "")})`
				);
			} else {
				rules.push(current);
			}
		}
	}
	return { rule: new RegExp(`^${ruleset.get("0")!}$`), msgs };
}
