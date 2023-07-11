import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import { Text } from '@/components/ui/text/text.component';

import styles from './block-item.module.scss';
import template from './block-item.template.html';

export class BlockItem extends ChildComponent {
	constructor(block) {
		super();

		this.block = block;
		this.element = renderService.htmlToElement(template, [], styles);
	}
	render() {
		$R(this.element).append(new Text(this.block.title).render());

		this.block.tasks.forEach(task => {
			console.log(task);
			$R(this.element)
				.append(new Text(task.title).render())
				.append(new Text(task.time).render());
		});
		return this.element;
	}
}
