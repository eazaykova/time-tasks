import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { StorageService } from '@/core/services/storage.service';

import { TimerModal } from '@/components/modals/timerModal/timerModal.component';
import { Button } from '@/components/ui/button/button.component';
import { Field } from '@/components/ui/field/field.component';
import { Modal } from '@/components/ui/modal/modal.component';
import { Text } from '@/components/ui/text/text.component';

import styles from './block-task.module.scss';
import template from './block-task.template.html';

export class BlockTask extends ChildComponent {
	constructor(titleBlock, task) {
		super();
		this.titleBlock = titleBlock;
		this.task = task;
		this.storageService = new StorageService();
		this.element = renderService.htmlToElement(template, [], styles);
	}

	#doneTask = event => {
		console.log('aaa');
		if (event.target.checked) {
			$R(this.element).addClass('done');
			if (this.task.time) {
				$R(this.element).find('button').hide();
			}
			this.storageService.taskStatus(this.titleBlock, this.task.id, true);
		} else {
			$R(this.element).removeClass('done');
			if (this.task.time) {
				$R(this.element).find('button').show();
			}
			this.storageService.taskStatus(this.titleBlock, this.task.id, false);
		}
	};

	#timer = () => {
		$R(document.body).append(
			new Modal(new TimerModal(this.titleBlock, this.task).render()).render()
		);
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
						variant: 'gray',
						onClick: () => this.#timer()
					}).render()
				);
		}

		if (this.task.done) {
			$R(this.element)
				.find(`[name='checkbox${this.task.id}']`)
				.attr('checked', true);

			$R(this.element).addClass('done');
			if (this.task.time) {
				$R(this.element).find('button').hide();
			}
		}

		return this.element;
	}
}
