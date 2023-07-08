import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { Store } from '@/core/store/store';

import { DeleteModal } from '@/components/screens/modals/deleteModal/deleteModal.component';
import { Button } from '@/components/ui/button/button.component';
import { Modal } from '@/components/ui/modal/modal.component';
import { Text } from '@/components/ui/text/text.component';

import styles from './create-task-item.module.scss';
import template from './create-task-item.template.html';

export class CreateTaskItem extends ChildComponent {
	constructor(task) {
		super();
		this.task = task;
		this.store = Store.getInstance();
		this.element = renderService.htmlToElement(template, [], styles);
	}

	#delete = id => {
		$R(document.body).append(new Modal(new DeleteModal(id).render()).render());
	};

	#updateTask = (id, title, time) => {
		this.store.updateTask(id, title, time);

		$R(document.body).find('form').find("[name='task']").value('');
		$R(document.body).find('form').find("[name='time']").value('');

		const buttons = $R(document.body).find('form').find('#buttons');

		buttons.find("[name='saveButton']").remove();

		buttons.find('button:last-child').show();
		buttons.find('button:first-child').show();
	};

	#edit = (event, id) => {
		const previousButton = $R(this.element).getPreviousElementSibling(
			event.target.parentNode
		);

		const time = previousButton.textContent;
		const task = $R(this.element).getPreviousElementSibling(
			previousButton
		).textContent;

		$R(document.body).find('form').find("[name='task']").value(task);
		$R(document.body).find('form').find("[name='time']").value(time);

		const buttons = $R(document.body).find('form').find('#buttons');
		buttons.find('button:last-child').hide();
		buttons.find('button:first-child').hide();
		buttons.append(
			new Button({
				children: 'Сохранить',
				type: 'button',
				name: 'saveButton',
				onClick: () =>
					this.#updateTask(
						id,
						$R(document.body).find('form').find("[name='task']").value(),
						$R(document.body).find('form').find("[name='time']").value()
					)
			}).render()
		);
	};

	render() {
		$R(this.element)
			.append(new Text(this.task.title).render())
			.append(new Text(this.task.time).render())
			.append(
				new Button({
					children: '<img src="/icon/edit.svg" alt="edit">',
					type: 'button',
					variant: 'gray',
					onClick: event => this.#edit(event, this.task.id)
				}).render()
			)
			.append(
				new Button({
					children: '<img src="/icon/delete.svg" alt="delete">',
					type: 'button',
					variant: 'gray',
					onClick: () => this.#delete(this.task.id)
				}).render()
			);
		return this.element;
	}
}
