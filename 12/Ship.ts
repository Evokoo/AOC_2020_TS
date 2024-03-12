type Point = { x: number; y: number };

export class Ship {
	private x: number;
	private y: number;
	private bearing: number;

	constructor(x: number, y: number, bearing: number) {
		this.x = x;
		this.y = y;
		this.bearing = bearing;
	}

	public update = (command: string, amount: number): void => {
		switch (command) {
			case "N":
				this.y += amount;
				break;
			case "S":
				this.y -= amount;
				break;
			case "E":
				this.x += amount;
				break;
			case "W":
				this.x -= amount;
				break;
			case "R":
				this.bearing = (this.bearing + amount) % 360;
				break;
			case "L":
				this.bearing = (this.bearing - amount) % 360;
				this.bearing =
					this.bearing < 0 ? (this.bearing + 360) % 360 : this.bearing;
				break;
			case "F":
				switch (this.bearing) {
					case 0:
						this.y += amount;
						break;
					case 90:
						this.x += amount;
						break;
					case 180:
						this.y -= amount;
						break;
					case 270:
						this.x -= amount;
						break;
					default:
						console.log({ bearing: this.bearing });
						throw Error("Bearing invalid");
				}
				break;
			default:
				console.log({ command });
				throw Error("Command invalid");
		}
	};

	get position(): Point {
		return { x: this.x, y: this.y };
	}
}
