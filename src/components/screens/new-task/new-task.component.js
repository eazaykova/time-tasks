import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { Store } from '@/core/store/store';

import { Button } from '@/components/ui/button/button.component';

import styles from './new-task.module.scss';
import template from './new-task.template.html';

import { CreateTask } from './create-task/create-task.component';

export class NewTask extends ChildComponent {
	constructor() {
		super();

		this.store = Store.getInstance();
	}
	render() {
		this.element = renderService.htmlToElement(template, [CreateTask], styles);

		$R(this.element).append(
			new Button({
				children: 'Добавить444',
				onClick: () => console.log(this.store.state.block),
				variant: 'green'
			}).render()
		);
		return this.element;
	}
}
