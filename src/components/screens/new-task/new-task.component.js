import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import { Field } from '@/components/ui/field/field.component';
import { Title } from '@/components/ui/title/title.component';

import styles from './new-task.module.scss';
import template from './new-task.template.html';

export class NewTask extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					placeholder: 'Введите название блока',
					name: 'title-block'
				})
			],
			styles
		);

		$R(this.element)
			.find('#new-task')
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

		return this.element;
	}
}
