export class Store {
	/**
	 * Create a new Store instance.
	 * @param {Object} initialState - The initial state for the store.
	 */
	constructor(initialState) {
		this.observers = [];

		/*this.storageService = new StorageService();*/
		/*const savedUser = this.storageService.getItem(USER_STORAGE_KEY);*/

		const state = /*savedUser ? { block: savedUser } : */ initialState;

		this.state = new Proxy(state, {
			set: (target, property, value) => {
				target[property] = value;

				this.notify();
				return true;
			}
		});
	}

	/**
	 * Get the singleton instance of the Store.
	 * @returns {Store} - The singleton instance of the Store.
	 */
	static getInstance() {
		if (!Store.instance) {
			Store.instance = new Store({ block: null });
		}
		return Store.instance;
	}

	/**
	 * Add an observer to the store's list of observers.
	 * @param {Object} observer - The observer object to add.
	 */
	addObserver(observer) {
		this.observers.push(observer);
	}

	/**
	 * Remove an observer from the store's list of observers.
	 * @param {Object} observer - The observer object to remove.
	 */
	removeObserver(observer) {
		this.observers = this.observers.filter(obs => obs !== observer);
	}

	/**
	 * Notify all observers of the state changes.
	 */
	notify() {
		for (const observer of this.observers) {
			observer.update();
		}
	}

	/**
	 * Update block.
	 * @param {Object} block - The blocks object.
	 */
	updateBlocks(block) {
		const oldBlock = this.state.block;
		const newBlock = { ...oldBlock, block };
		this.state.block = newBlock;
		/*this.storageService.setItem(USER_STORAGE_KEY, newUser);*/
	}

	/**
	 * Add task.
	 * @param {Object} task - The task object.
	 */
	addTask(task) {
		const block = this.state.block;
		block.block.tasks.push(task);
		this.notify();
	}

	/**
	 * Delete task.
	 * @param {number} id - The task object.
	 */
	deleteTask(id) {
		const newTasks = this.state.block.block.tasks.filter(
			current => current.id !== id
		);
		this.state.block.block.tasks.length = 0;
		this.state.block.block.tasks.push(...newTasks);
		this.notify();
	}

	/**
	 * Update task.
	 * @param {number} id - The task object.
	 */
	updateTask(id, title, time) {
		console.log('ff');
		const updateTask = {};
		let indexTask = 0;
		this.state.block.block.tasks.forEach((current, index) => {
			if (current.id === id) {
				updateTask.id = id;
				updateTask.title = title;
				updateTask.time = time;
				indexTask = index;
			}
		});

		this.state.block.block.tasks[indexTask] = updateTask;

		this.notify();
	}
}
