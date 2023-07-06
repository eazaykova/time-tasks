import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import formService from '@/core/services/form.service';
import renderService from '@/core/services/render.service';
import { Store } from '@/core/store/store';

import { Button } from '@/components/ui/button/button.component';
import { Field } from '@/components/ui/field/field.component';
import { Text } from '@/components/ui/text/text.component';

import styles from './create-task-form.module.scss';
import template from './create-task-form.template.html';

export class CreateTaskForm extends ChildComponent {
	constructor() {
		super();

		this.store = Store.getInstance();
		this.element = renderService.htmlToElement(template, [], styles);
	}
	#add = event => {
		const formValues = formService.getFormValues(event.target);

		if (!this.store.state.block) {
			this.store.updateBlocks({
				title: formValues['title-block'],
				tasks: [{ id: 0, title: formValues['task'], time: formValues['time'] }]
			});
		} else {
			let length = this.store.state.block.block.tasks.length;
			this.store.addTask({
				id: this.store.state.block.block.tasks[length - 1].id + 1,
				title: formValues['task'],
				time: formValues['time']
			});
		}

		this.#reset();
	};

	#reset = () => {
		$R(this.element).find("[name='title-block']").value('');
		$R(this.element).find("[name='task']").value('');
		$R(this.element).find("[name='time']").value('');
	};

	render() {
		$R(this.element)
			.find('#create-task-form')
			.append(
				new Field({
					placeholder: 'Введите название блока',
					name: 'title-block'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Введите задачу',
					name: 'task'
				}).render()
			)
			.append(new Text('Таймер (h:m):').render())
			.append(
				new Field({
					type: 'time',
					name: 'time'
				}).render()
			);

		$R(this.element)
			.find('#buttons')
			.append(
				new Button({
					children: 'Добавить',
					onClick: $R(this.element).submit(this.#add),
					variant: 'green'
				}).render()
			)
			.append(
				new Button({
					children: 'Сбросить',
					onClick: () => this.#reset(),
					variant: 'gray',
					type: 'button'
				}).render()
			);

		return this.element;
	}
}
