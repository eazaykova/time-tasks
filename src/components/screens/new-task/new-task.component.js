import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';
import { Store } from '@/core/store/store';

import styles from './new-task.module.scss';
import template from './new-task.template.html';

import { CreateTaskForm } from './create-task-form/create-task-form.component';
import { CreateTasksList } from './create-tasks-list/create-tasks-list.component';

export class NewTask extends ChildComponent {
	constructor() {
		super();

		this.store = Store.getInstance();
	}
	render() {
		this.element = renderService.htmlToElement(
			template,
			[CreateTaskForm, CreateTasksList],
			styles
		);
		return this.element;
	}
}
