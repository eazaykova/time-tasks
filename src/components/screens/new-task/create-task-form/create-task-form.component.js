import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import formService from '@/core/services/form.service';
import renderService from '@/core/services/render.service';
import validationService from '@/core/services/validation.service';
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

	#validateFields(formValues) {
		const divForm = $R(this.element).find('#create-task-form').findAll('div');
		if (!formValues['title-block']) {
			validationService.showError(divForm[0]);
		}

		return formValues['title-block'];
	}

	#deleteValidateFields() {
		const divForm = $R(this.element).find('#create-task-form').findAll('div');
		validationService.deleteError(divForm[0]);
		return;
	}

	#add = event => {
		const formValues = formService.getFormValues(event.target);
		if (!this.#validateFields(formValues)) {
			const setTime = setTimeout(() => {
				this.#deleteValidateFields();
				clearTimeout(setTime);
			}, 2500);

			return;
		}

		if (!this.store.state.block) {
			if (formValues['task']) {
				this.store.updateBlocks({
					title: formValues['title-block'],
					tasks: [
						{
							id: 0,
							title: formValues['task'],
							time: formValues['time'],
							done: false
						}
					]
				});
			} else {
				this.store.updateBlocks({
					title: formValues['title-block']
				});
			}
		} else {
			if (formValues['task']) {
				let length = this.store.state.block.block.tasks?.length || 0;
				this.store.addTask({
					id:
						length === 0
							? 0
							: this.store.state.block.block.tasks[length - 1].id + 1,
					title: formValues['task'],
					time: formValues['time'],
					done: false
				});
			}

			this.store.updateTitleBlock(formValues['title-block']);
		}

		console.log(this.store);

		this.#reset();
	};

	#reset = () => {
		$R(this.element).find("[name='task']").value('');
		$R(this.element).find("[name='time']").value('');
	};

	#resetAll = () => {
		$R(this.element).find("[name='title-block']").value('');
		this.#reset();
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
					onClick: () => this.#resetAll(),
					variant: 'gray',
					type: 'button'
				}).render()
			);

		return this.element;
	}
}
