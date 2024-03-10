// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		insturctions = parseInput(data),
		accumulator = runCode(insturctions);

	return accumulator;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "08");

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

	while (true) {
		if (history.has(register.index)) {
			break;
		} else {
			history.add(register.index);
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

	return register.acc;
}
