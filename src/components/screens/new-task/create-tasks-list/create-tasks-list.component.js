import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { Store } from '@/core/store/store';

import { Text } from '@/components/ui/text/text.component';

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
		this.state = this.store.state.block?.block;
		this.titleBlock = this.state?.title;
		this.tasks = this.state?.tasks;

		if (this.titleBlock) {
			$R(this.element)
				.text('')
				.append(new Text(` Название блока: ${this.titleBlock}`).render());
		}

		if (this.tasks) {
			if (this.tasks.length > 0) {
				$R(this.element)
					.text('')
					.append(new Text(` Название блока: ${this.titleBlock}`).render());
				this.tasks.forEach(task => {
					$R(this.element).append(new CreateTaskItem(task).render());
				});
			} else {
				$R(this.element).text('Задачи еще не добавлены!');
				$R(document.body)?.find('#buttonsList')?.hide();
			}
		} else {
			if (this.titleBlock) {
				$R(this.element)
					.text('')
					.append(new Text(` Название блока: ${this.titleBlock}`).render())
					.append(new Text(` Задачи еще не добавлены!`).render());
			} else {
				$R(this.element).text('Задачи еще не добавлены!');
			}
		}
	}

	render() {
		this.update();
		return this.element;
	}
}
