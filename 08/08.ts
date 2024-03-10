// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		insturctions = parseInput(data),
		{ accumulator } = runCode(insturctions);

	return accumulator;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		insturctions = parseInput(data),
		accumulator = fixLoop(insturctions);

	return accumulator;
}

//Run
solveB("example_b", "08");

// Functions
type Instruction = { type: string; value: number };

function parseInput(data: string) {
	const instructions: Instruction[] = [];

	for (const line of data.split("\r\n")) {
		const [type, value] = line.split(" ");

		instructions.push({ type, value: +value });
	}

	return instructions;
}
function runCode(instructions: Instruction[]) {
	const history: Set<number> = new Set();
	const register: Record<string, number> = { acc: 0, index: 0 };

	let status = "Complete";

	while (true) {
		if (history.has(register.index)) {
			status = "Loop";
			break;
		} else {
			history.add(register.index);
		}

		if (register.index >= instructions.length) {
			break;
		}

		const instruction = instructions[register.index];

		switch (instruction.type) {
			case "acc":
				register.acc += instruction.value;
				register.index++;
				break;
			case "jmp":
				register.index += instruction.value;
				break;
			case "nop":
				register.index++;
				break;
			default:
				throw Error("Invalid instruction type");
		}
	}

	return { status, accumulator: register.acc };
}
function fixLoop(instructions: Instruction[]) {
	for (let i = 0; i < instructions.length; i++) {
		const instruction = instructions[i];
		const copy = [...instructions];

		if (instruction.type === "acc") {
			continue;
		} else if (instruction.type === "jmp") {
			copy[i] = { type: "nop", value: instruction.value };
		} else if (instruction.type === "nop") {
			copy[i] = { type: "jmp", value: instruction.value };
		}

		const { status, accumulator } = runCode(copy);

		if (status === "Complete") {
			return accumulator;
		}
	}

	throw Error("Failed to fix loop");
}
