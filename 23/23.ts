// Imports
import TOOLS from "../00/tools";
import { LinkedList, ListNode } from "./LinkedList";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ cups, min, max } = parseInput(data),
		labels = playGame(cups, min, max);

	return +labels;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "23");

// Functions
function parseInput(data: string) {
	const digits = [...data].map(Number);
	const cups = new LinkedList<number>();
	const min = Math.min(...digits);
	const max = Math.max(...digits);

	for (let digit of digits) {
		cups.add(digit);
	}

	return { cups, min, max };
}

function playGame(cups: LinkedList<number>, min: number, max: number) {
	let currentCup: ListNode<number> = cups.head!;

	for (let move = 0; move < 100; move++) {
		const removed = cups.remove(currentCup.next!, 3);
		const remaining = new Set(cups.printList);

		let destination = currentCup.data - 1;

		while (!remaining.has(destination)) {
			destination--;

			if (destination < min) {
				destination = max;
			}
		}
		cups.insert(destination, removed);
		currentCup = currentCup.next!;
	}

	const finalOrder = cups.printList;
	const oneIndex = finalOrder.indexOf(1);

	return [
		...finalOrder.slice(oneIndex + 1),
		...finalOrder.slice(0, oneIndex),
	].join("");
}
