import { BLOCKS_KEY } from '@/constants/blocks.constants';

/**
 * StorageService is a class that provides an interface for working with localStorage
 * in a more convenient and structured way.
 */
export class StorageService {
	/**
	 * Retrieves an item from localStorage by the provided key.
	 *
	 * @param {string} key - The key of the item to be retrieved.
	 * @returns {any} The value of the item, or null if the item doesn't exist.
	 */
	getItem(key) {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	}

	/**
	 * Saves an item in localStorage with the provided key and value.
	 *
	 * @param {string} key - The key under which the value will be stored.
	 * @param {any} value - The value to be stored.
	 */
	setItem(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	/**
	 * Removes an item from localStorage by the provided key.
	 *
	 * @param {string} key - The key of the item to be removed.
	 */
	removeItem(key) {
		localStorage.removeItem(key);
	}

	/**
	 * Clears all data from localStorage.
	 */
	clear() {
		localStorage.clear();
	}

	deleteBlock(title) {
		const oldBlocks = this.getItem(BLOCKS_KEY);
		const newBlocks = oldBlocks.filter(current => current.title !== title);
		this.setItem(BLOCKS_KEY, [...newBlocks]);
	}

	addBlock(block) {
		if (this.getItem(BLOCKS_KEY)) {
			const blocks = this.getItem(BLOCKS_KEY);
			let isBlockExists = blocks.some(current => current.title === block.title);

			if (!isBlockExists) {
				this.setItem(BLOCKS_KEY, [...blocks, block]);
				return true;
			} else {
				return false;
			}
		} else {
			this.setItem(BLOCKS_KEY, [block]);
			return true;
		}
	}

	taskStatus(titleBlock, idTask, status) {
		const blocks = this.getItem(BLOCKS_KEY);
		const block = blocks
			.filter(current => current.title === titleBlock)
			.map(current => {
				current.tasks.map(item => {
					if (item.id === idTask) {
						item.done = status;
					}
					return item;
				});
				return current;
			});

		const newBlocks = blocks.map(current => {
			if (current.title === titleBlock) {
				current = block[0];
			}
			return current;
		});

		this.setItem(BLOCKS_KEY, newBlocks);
	}
}
