import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import { DeleteBlockModal } from '@/components/modals/deleteBlockModal/deleteBlockModal.component';
import { Button } from '@/components/ui/button/button.component';
import { Modal } from '@/components/ui/modal/modal.component';
import { Text } from '@/components/ui/text/text.component';

import styles from './block-item.module.scss';
import template from './block-item.template.html';

import { BlockTask } from '../block-task/block-task.component';

export class BlockItem extends ChildComponent {
	constructor(block) {
		super();

		this.block = block;
		this.element = renderService.htmlToElement(template, [], styles);
	}

	#delete = title => {
		$R(document.body).append(
			new Modal(new DeleteBlockModal(title).render()).render()
		);
	};

	render() {
		$R(this.element)
			.find('.title-block-item')
			.append(new Text(this.block.title).render())
			.append(
				new Button({
					children: '<img src="/icon/delete.svg" alt="delete">',
					type: 'button',
					onClick: () => this.#delete(this.block.title)
				}).render()
			);

		this.block.tasks.forEach(task => {
			$R(this.element).append(new BlockTask(this.block.title, task).render());
		});
		return this.element;
	}
}
