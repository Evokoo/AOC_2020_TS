import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./08";

const currentDay = path.basename(__dirname);

describe(`AOC 2020 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(5);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(1709);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(8);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(1976);
		});
	});
});
