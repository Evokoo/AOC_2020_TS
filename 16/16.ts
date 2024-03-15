// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		ticketInfo = parseInput(data),
		errorRate = validateTickets(ticketInfo);

	return errorRate;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "16");

// Functions
type Range = { min: number; max: number };
type TicketInfo = {
	fields: Record<string, Range[]>;
	myTicket: number[];
	otherTickets: number[][];
};

function parseInput(data: string) {
	const sections = data.split(/\r\n\s*\r\n/);

	const fields: Record<string, Range[]> = {};
	const myTicket: number[] = (sections[1].match(/\d+/g) || []).map(Number);
	const otherTickets: number[][] = [];

	for (const field of sections[0].split("\r\n")) {
		const filedName = field.match(/^\w+(\s\w+)*(?=:)/)![0];
		const ranges = field.match(/\d+/g) || [];

		fields[filedName] = [
			{ min: +ranges[0]!, max: +ranges[1]! },
			{ min: +ranges[2]!, max: +ranges[3]! },
		];
	}

	for (const ticket of sections[2].split("\r\n").slice(1)) {
		otherTickets.push((ticket.match(/\d+/g) || []).map(Number));
	}

	return { fields, myTicket, otherTickets };
}
function validateTickets({ fields, otherTickets }: TicketInfo) {
	const ranges = Object.values(fields).reduce(
		(acc, cur) => acc.concat(cur),
		[]
	);
	const invalid: number[] = [];

	for (const ticket of otherTickets) {
		for (const value of ticket) {
			let valid: boolean = false;

			for (const range of ranges) {
				if (valid === true) {
					break;
				}

				if (value >= range.min && value <= range.max) {
					valid = true;
				}
			}

			if (valid === false) {
				invalid.push(value);
			}
		}
	}

	return invalid.reduce((acc, cur) => acc + cur, 0);
}
