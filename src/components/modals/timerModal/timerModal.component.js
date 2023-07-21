import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import { Timer } from '@/components/timer/timer.component';
import { Text } from '@/components/ui/text/text.component';

import styles from './timerModal.module.scss';
import template from './timerModal.template.html';

export class TimerModal extends ChildComponent {
	constructor(titleBlock, task) {
		super();
		this.titleBlock = titleBlock;
		this.task = task;
		this.element = renderService.htmlToElement(template, [], styles);
	}

	render() {
		$R(this.element)
			.append(new Timer(this.titleBlock, this.task).render())
			.append(new Text(this.task.title).render());
		return this.element;
	}
}
