import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import formService from '@/core/services/form.service';
import renderService from '@/core/services/render.service';

import { Button } from '@/components/ui/button/button.component';
import { Field } from '@/components/ui/field/field.component';
import { Title } from '@/components/ui/title/title.component';

import styles from './create-task.module.scss';
import template from './create-task.template.html';

export class CreateTask extends ChildComponent {
	#add = event => {
		console.log(event.target);
		const formValues = formService.getFormValues(event.target);
		console.log(formValues);
	};

	#reset = () => {
		$R(this.element).find("[name='title-block']").value('');
		$R(this.element).find("[name='task']").value('');
		$R(this.element).find("[name='time']").value('');
	};

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$R(this.element)
			.find('#create-task')
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
			.append(new Title('Таймер (h:m):').render())
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
