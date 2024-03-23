// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ card, door } = parseInput(data),
		encryptionKey = getEncryptionKey(card, getLoopSize(door));

	return encryptionKey;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "25");

// Functions
function parseInput(data: string) {
	const [card, door] = data.split("\r\n").map(Number);
	return { card, door };
}
function processNumber(
	value: number,
	subject: number = 7,
	divisor: number = 20201227
) {
	return (value * subject) % divisor;
}
function getLoopSize(publicKey: number) {
	let loopSize = 0;
	let value = 1;

	while (value !== publicKey) {
		value = processNumber(value);
		loopSize++;
	}

	return loopSize;
}
function getEncryptionKey(publicKey: number, loops: number) {
	let key = 1;

	for (let i = 0; i < loops; i++) {
		key = processNumber(key, publicKey);
	}

	return key;
}
