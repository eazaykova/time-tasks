import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { StorageService } from '@/core/services/storage.service';
import { Store } from '@/core/store/store';

import { Button } from '@/components/ui/button/button.component';
import { Text } from '@/components/ui/text/text.component';

import styles from './deleteBlockModal.module.scss';
import template from './deleteBlockModal.template.html';

export class DeleteBlockModal extends ChildComponent {
	constructor(title) {
		super();

		this.title = title;
		this.store = Store.getInstance();
		this.storageService = new StorageService();
		this.element = renderService.htmlToElement(template, [], styles);
	}

	#closeModal = () => {
		$R(document.body).find('#modal').remove();
	};

	#deleteBlock = () => {
		$R(document.body).find('#modal').remove();
		this.storageService.deleteBlock(this.title);
		this.store.notify();
	};

	render() {
		$R(this.element)
			.append(new Text('Удалить блок?').render())
			.append(
				new Button({
					children: 'Удалить',
					type: 'button',
					variant: 'dark-gray',
					onClick: () => this.#deleteBlock()
				}).render()
			)
			.append(
				new Button({
					children: 'Отмена',
					type: 'button',
					variant: 'green',
					onClick: () => this.#closeModal()
				}).render()
			);
		return this.element;
	}
}
