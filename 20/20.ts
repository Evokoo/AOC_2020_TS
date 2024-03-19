// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		photos = parseInput(data);

	arrangePhotos(photos);

	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("example_a", "20");

// Functions
type Border = [string, string, string, string];
type Photo = { ID: number; orientations: Border[] };

function parseInput(data: string) {
	const tiles = data.split(/\r\n\s*\r\n/);
	const photos: Photo[] = [];

	for (const tile of tiles) {
		const sections = tile.split("\r\n");
		const ID = +sections[0].match(/\d+/)![0];
		const photo: Photo = { ID, orientations: [] };
		const grid = sections.slice(1).map((row) => [...row]);

		const regular = getBorders(grid);
		const flipped = regular.map((border) => [...border].reverse().join(""));

		photo.orientations.push(regular, flipped as Border);
		photos.push(photo);
	}

	return photos;
}

function getBorders(grid: string[][]) {
	const borders: Border = ["", "", "", ""];
	const size = grid.length;

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			if (y === 0) {
				borders[0] += grid[y][x];
			} else if (y === size - 1) {
				borders[3] += grid[y][x];
			} else if (x === 0) {
				borders[1] += grid[y][x];
			} else if (x === size - 1) {
				borders[2] += grid[y][x];
			}
		}
	}

	return borders;
}
function rotateGrid(grid: string[][]) {
	const size = grid.length;
	const newOrientation: string[][] = [];

	for (let i = 0; i < size; i++) {
		newOrientation.push([]);
		for (let j = 0; j < size; j++) {
			newOrientation[i].push(grid[size - j - 1][i]);
		}
	}

	return newOrientation;
}
function arrangePhotos(photos: Photo[]) {}
