import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import styles from './create-tasks-list.module.scss';
import template from './create-tasks-list.template.html';

import { CreateTaskItem } from './create-task-item/create-task-item.component';

export class CreateTasksList extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$R(this.element)
			.append(new CreateTaskItem().render())
			.append(new CreateTaskItem().render());
		return this.element;
	}
}
