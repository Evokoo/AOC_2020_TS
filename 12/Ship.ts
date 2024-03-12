type Point = { x: number; y: number };

export class Ship {
	private x: number;
	private y: number;
	private wp: Point;
	private bearing: number;

	constructor(x: number, y: number, bearing: number, wp: Point) {
		this.x = x;
		this.y = y;
		this.wp = wp;
		this.bearing = bearing;
	}

	public update = (
		command: string,
		amount: number,
		followWP: boolean
	): void => {
		switch (command) {
			case "N":
				followWP ? (this.wp.y += amount) : (this.y += amount);
				break;
			case "S":
				followWP ? (this.wp.y -= amount) : (this.y -= amount);
				break;
			case "E":
				followWP ? (this.wp.x += amount) : (this.x += amount);
				break;
			case "W":
				followWP ? (this.wp.x -= amount) : (this.x -= amount);
				break;
			case "R":
				if (followWP) {
					this.rotateWayPoint(amount, true);
				} else {
					this.bearing = (this.bearing + amount) % 360;
				}
				break;
			case "L":
				if (followWP) {
					this.rotateWayPoint(amount, false);
				} else {
					this.bearing = (this.bearing - amount) % 360;
					this.bearing =
						this.bearing < 0 ? (this.bearing + 360) % 360 : this.bearing;
				}
				break;
			case "F":
				if (followWP) {
					for (let i = 0; i < amount; i++) {
						this.x += this.wp.x;
						this.y += this.wp.y;
					}
				} else {
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
				}
				break;
			default:
				console.log({ command });
				throw Error("Command invalid");
		}
	};

	private rotateWayPoint = (amount: number, clockwise: boolean): void => {
		const rotations = Math.abs(amount / 90);

		for (let i = 0; i < rotations; i++) {
			const { x, y } = this.wp;
			const [nx, ny] = clockwise ? [y, -x] : [-y, x];

			if (clockwise) {
				this.wp.x = nx;
				this.wp.y = ny;
			} else {
				this.wp.x = nx;
				this.wp.y = ny;
			}
		}
	};

	get position(): Point {
		return { x: this.x, y: this.y };
	}
}
