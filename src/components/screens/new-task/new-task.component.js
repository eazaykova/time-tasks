import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { StorageService } from '@/core/services/storage.service';
import { Store } from '@/core/store/store';

import { MessageModal } from '@/components/modals/messageModal/messageModal.component';
import { ResetBlockModal } from '@/components/modals/resetBlockModal/resetBlockModal.component';
import { Button } from '@/components/ui/button/button.component';
import { Modal } from '@/components/ui/modal/modal.component';

import styles from './new-task.module.scss';
import template from './new-task.template.html';

import { CreateTaskForm } from './create-task-form/create-task-form.component';
import { CreateTasksList } from './create-tasks-list/create-tasks-list.component';

export class NewTask extends ChildComponent {
	constructor() {
		super();

		this.store = Store.getInstance();
		this.storageService = new StorageService();
		this.store.addObserver(this);
	}

	#reset = () => {
		$R(document.body).append(
			new Modal(new ResetBlockModal().render()).render()
		);
	};

	#saveBlockLS = () => {
		let isExists = this.storageService.addBlock(this.store.state.block?.block);
		if (isExists) {
			$R(document.body).append(
				new Modal(new MessageModal('Блок успешно сохранен!').render()).render()
			);
			$R(document.body).find('form').find("[name='title-block']").value('');
			this.store.clearBlock();
			$R(document.body).find('#buttonsList').hide();
		} else {
			$R(document.body).append(
				new Modal(
					new MessageModal('Блок с таким именем уже существует!').render()
				).render()
			);
		}
	};

	update() {
		const isRender = $R(this.element).find('#buttonsList').html();
		this.tasks = this.store.state.block?.block?.tasks;

		if (this.tasks && !isRender) {
			if (this.tasks.length > 0) {
				$R(this.element)
					.find('#buttonsList')
					.append(
						new Button({
							children: 'Сохранить',
							type: 'button',
							variant: 'green',
							onClick: () => this.#saveBlockLS()
						}).render()
					)
					.append(
						new Button({
							children: 'Сбросить',
							type: 'button',
							variant: 'gray',
							onClick: () => this.#reset()
						}).render()
					);
			}
		}
		$R(this.element).find('#buttonsList').show();
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[CreateTaskForm, CreateTasksList],
			styles
		);

		return this.element;
	}
}
