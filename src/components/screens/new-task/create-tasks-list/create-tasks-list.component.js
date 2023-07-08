import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { Store } from '@/core/store/store';

import styles from './create-tasks-list.module.scss';
import template from './create-tasks-list.template.html';

import { CreateTaskItem } from './create-task-item/create-task-item.component';

export class CreateTasksList extends ChildComponent {
	constructor() {
		super();
		this.store = Store.getInstance();
		this.store.addObserver(this);
		this.element = renderService.htmlToElement(template, [], styles);
	}

	update() {
		this.tasks = this.store.state.block?.block?.tasks;

		if (this.tasks) {
			if (this.tasks.length > 0) {
				this.tasks.forEach((task, index) => {
					if (index === 0) $R(this.element).text('');
					$R(this.element).append(new CreateTaskItem(task).render());
				});
			} else {
				$R(this.element).text('Задачи еще не добавлены!');
			}
		} else {
			$R(this.element).text('Задачи еще не добавлены!');
		}
	}

	render() {
		this.update();
		return this.element;
	}
}
