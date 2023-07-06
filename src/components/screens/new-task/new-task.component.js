import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';

import styles from './new-task.module.scss';
import template from './new-task.template.html';

import { CreateTask } from './create-task/create-task.component';

export class NewTask extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [CreateTask], styles);

		return this.element;
	}
}
