// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		ticketInfo = parseInput(data),
		{ errorRate } = validateTickets(ticketInfo);

	return errorRate;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		ticketInfo = parseInput(data),
		{ validTickets } = validateTickets(ticketInfo);

	return validateFields(ticketInfo, validTickets);
}

//Run
solveB("input", "16");

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
	const validTickets: number[][] = [];
	const ranges = Object.values(fields).reduce((a, b) => a.concat(b), []);

	let errorRate: number = 0;

	while (otherTickets.length) {
		const ticket = otherTickets.shift()!;

		let validTicket = true;

		for (const value of ticket) {
			let isValid: boolean = false;

			for (const range of ranges) {
				if (isValid === true) {
					break;
				} else if (value >= range.min && value <= range.max) {
					isValid = true;
				}
			}

			if (!isValid) {
				errorRate += value;
				validTicket = false;
			}
		}

		if (validTicket) {
			validTickets.push(ticket);
		}
	}

	return { errorRate, validTickets };
}
function validateFields({ fields, myTicket }: TicketInfo, tickets: number[][]) {
	const fieldNames: string[] = Object.keys(fields);
	const fieldScores: [string, number][][] = [];

	for (let i = 0; i < tickets[0].length; i++) {
		const score: Record<string, number> = {};

		for (let j = 0; j < tickets.length; j++) {
			const value = tickets[j][i];

			for (const field of fieldNames) {
				const result = fields[field].some(
					({ min, max }) => value >= min && value <= max
				);

				if (result === true) {
					score[field] = (score[field] ?? 0) + 1;
				}
			}
		}

		const results = Object.entries(score).sort((a, b) => b[1] - a[1]);
		fieldScores.push(results);
	}

	const fieldOrder: string[] = Array(fieldNames.length).fill(undefined);
	const assigned: Set<string> = new Set();

	while (assigned.size !== fieldOrder.length) {
		for (let i = 0; i < fieldScores.length; i++) {
			if (fieldOrder[i] === undefined) {
				const score = fieldScores[i].filter(
					([key, value]) => value === tickets.length && !assigned.has(key)
				);

				if (score.length === 1) {
					fieldOrder[i] = score[0][0];
					assigned.add(score[0][0]);
				}
			}
		}
	}

	const myScore = myTicket.reduce((score, value, i) => {
		if (fieldOrder[i].startsWith("dep")) score *= value;
		return score;
	}, 1);

	return myScore;
}
