export class ListNode<T> {
	data: T;
	next: ListNode<T> | null;

	constructor(data: T) {
		this.data = data;
		this.next = null;
	}
}

export class LinkedList<T> {
	head: ListNode<T> | null;
	tail: ListNode<T> | null;
	keyIndex: number;
	size: number;

	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
		this.keyIndex = 0;
	}

	public add = (data: T): void => {
		const newNode = new ListNode(data);

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
			newNode.next = this.head;
		} else {
			let current = this.head;

			while (current.next !== this.head) {
				current = current.next!;
			}

			current!.next = newNode;
			newNode.next = this.head;
			this.tail = current;
		}

		this.size++;
	};

	public append = (data: T): void => {
		const newNode = new ListNode(data);

		if (!this.tail) {
			this.head = newNode;
			this.tail = newNode;
			newNode.next = this.head;
		} else {
			let current = this.tail;

			this.tail = newNode;
			newNode.next = this.head;
			current.next = newNode;
		}

		this.size++;
	};

	public remove(current: ListNode<T>, count: number): T[] {
		const removedValues: T[] = [];
		let removedCount = 0;
		let prev: ListNode<T> | null = null;

		// If the list is empty or count is 0 or negative, return empty array
		if (!this.head || count <= 0) {
			return removedValues;
		}

		// Find the node prior to the current node
		let temp = this.head;
		while (temp.next !== current) {
			temp = temp.next!;
		}
		prev = temp;

		// Remove count number of nodes starting from current
		while (current && removedCount < count) {
			// Store the next node before removing the current one
			const nextNode = current.next!;

			// If prev is null and current is the head, update the head to the next node
			if (!prev && current === this.head) {
				this.head = nextNode;
			} else if (prev) {
				prev.next = nextNode;
			}

			// Add the data of the current node to removedValues
			removedValues.push(current.data);

			// If current is the head, update the head to the next node
			if (current === this.head) {
				this.head = nextNode;
			}

			// Move to the next node
			current = nextNode;
			removedCount++;
			this.size--;
		}

		return removedValues;
	}

	public insert = (target: T, values: T[]): void => {
		let current = this.head;
		let prev: ListNode<T> | null = null;

		// Traverse the list until either the target value is found or the end of the list is reached
		while (current && current.data !== target) {
			prev = current;
			current = current.next;
			// If current is null, it means we reached the end of the list
			// and the target value was not found, so we break out of the loop
			if (!current) {
				break;
			}
		}

		// If current is null, the target value was not found in the list
		// In this case, we insert the new nodes at the end of the list
		if (!current) {
			if (!prev) {
				// If prev is null, it means the list is empty
				for (const value of values) {
					const newNode = new ListNode(value);
					newNode.next = newNode; // Point to itself for circular behavior
					this.head = newNode;
					prev = newNode;
					this.size++;
				}
			} else {
				for (const value of values) {
					const newNode = new ListNode(value);
					newNode.next = this.head; // Point to the head for circular behavior
					prev.next = newNode;
					prev = newNode;
					this.size++;
				}
			}
		} else {
			// If current is not null, the target value was found in the list
			for (const value of values) {
				const newNode = new ListNode(value);
				newNode.next = current.next; // Insert after the current node
				current.next = newNode;
				current = newNode; // Move current to the newly inserted node
				if (current === this.head) {
					this.head = newNode; // Update the head if current is the head
				}
				if (!current.next) {
					this.tail = current;
				}
				this.size++;
			}
		}
	};

	get printList(): T[] {
		const list: T[] = [];

		if (!this.head) {
			console.log("List is empty");
			return [];
		}
		let current = this.head;
		do {
			if (current.data === 1) {
				this.keyIndex = list.length;
			}

			list.push(current.data);
			current = current.next!;
		} while (current !== this.head);

		return list;
	}
}
