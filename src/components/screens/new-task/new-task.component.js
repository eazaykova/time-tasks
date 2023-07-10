import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { Store } from '@/core/store/store';

import { Button } from '@/components/ui/button/button.component';

import styles from './new-task.module.scss';
import template from './new-task.template.html';

import { CreateTaskForm } from './create-task-form/create-task-form.component';
import { CreateTasksList } from './create-tasks-list/create-tasks-list.component';

export class NewTask extends ChildComponent {
	constructor() {
		super();

		this.store = Store.getInstance();
		this.store.addObserver(this);
	}

	#reset = () => {
		this.store.clearBlock();
		$R(this.element).find('#buttonsList').hide();
		$R(document.body).find("[name='title-block']").value('');
	};

	update() {
		const isRender = $R(this.element).find('#buttonsList').html();
		this.tasks = this.store.state.block?.block?.tasks;

		if (this.tasks && !isRender) {
			if (this.tasks.length > 0) {
				$R(this.element)
					.find('#buttonsList')
					.append(
						new Button({
							children: 'Сохранить',
							type: 'button',
							variant: 'green'
						}).render()
					)
					.append(
						new Button({
							children: 'Сбросить',
							type: 'button',
							variant: 'gray',
							onClick: () => this.#reset()
						}).render()
					);
			}
		}
		$R(this.element).find('#buttonsList').show();
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
