// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		boardingPasses = parseInput(data),
		{ maxID } = locateSeats(boardingPasses);

	return maxID;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		boardingPasses = parseInput(data),
		{ seats } = locateSeats(boardingPasses);

	return findSeatID(seats);
}

//Run
solveB("input", "05");

// Functions
type Seat = { x: number; y: number; ID: number };

function parseInput(data: string) {
	return data.split("\r\n");
}
function locateSeats(passes: string[]) {
	const seats: Seat[] = [];

	let maxID = 0;

	for (let pass of passes) {
		let xRange = Array.from({ length: 8 }, (_, i) => i);
		let yRange = Array.from({ length: 128 }, (_, i) => i);

		for (let char of [...pass]) {
			switch (char) {
				case "F":
					yRange = yRange.slice(0, yRange.length / 2);
					break;
				case "B":
					yRange = yRange.slice(yRange.length / 2);
					break;
				case "L":
					xRange = xRange.slice(0, xRange.length / 2);
					break;
				case "R":
					xRange = xRange.slice(xRange.length / 2);
					break;
			}
		}

		const [x, y] = [xRange[0], yRange[0]];
		const seat = { x, y, ID: y * 8 + x };

		maxID = Math.max(maxID, seat.ID);
		seats.push(seat);
	}

	return { seats, maxID };
}
function findSeatID(seats: Seat[]) {
	seats.sort((a, b) => a.ID - b.ID);

	let ID = seats[0].ID;

	for (let seat of seats.slice(1)) {
		if (seat.ID - ID === 1) {
			ID++;
		} else {
			return ID + 1;
		}
	}

	throw Error("Seat not found");
}
