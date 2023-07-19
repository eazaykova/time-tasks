import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import { Button } from '@/components/ui/button/button.component';
import { Field } from '@/components/ui/field/field.component';
import { Text } from '@/components/ui/text/text.component';

import styles from './block-task.module.scss';
import template from './block-task.template.html';

export class BlockTask extends ChildComponent {
	constructor(task) {
		super();
		this.task = task;
		this.element = renderService.htmlToElement(template, [], styles);
	}

	#doneTask = event => {
		if (event.target.checked) {
			if (this.task.time) {
				$R(this.element).addClass('done');
				$R(this.element).find('button').hide();
			}
		} else {
			$R(this.element).removeClass('done');
			if (this.task.time) {
				$R(this.element).find('button').show();
			}
		}
	};

	render() {
		$R(this.element)
			.append(
				new Field({
					type: 'checkbox',
					name: `checkbox${this.task.id}`,
					onClick: event => this.#doneTask(event)
				}).render()
			)
			.append(new Text(this.task.title).render());

		if (this.task.time) {
			$R(this.element)
				.append(new Text(this.task.time).render())
				.append(
					new Button({
						children: '<img src="/icon/play.svg" alt="play">',
						type: 'button',
						variant: 'gray'
					}).render()
				);
		}

		return this.element;
	}
}
