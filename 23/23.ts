// Imports
import TOOLS from "../00/tools";
import { LinkedList, ListNode } from "./LinkedList";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		cups = parseInput(data),
		labels = playGame(cups);

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
	const cups = new LinkedList<number>();
	const digits = [...data].map(Number);

	for (const digit of digits) {
		cups.append(digit);
	}

	return cups;
}
function playGame(cups: LinkedList<number>) {
	const range = { min: 1, max: 9 };
	const moves = 100;

	let currentCup: ListNode<number> = cups.head!;

	for (let move = 0; move < moves; move++) {
		const removed = cups.remove(currentCup.next!, 3);
		const skip = new Set(removed);

		let destination = currentCup.data - 1;

		while (skip.has(destination) || destination < range.min) {
			if (destination < range.min) {
				destination = range.max;
			} else {
				destination--;
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
