import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { Store } from '@/core/store/store';

import { Button } from '@/components/ui/button/button.component';
import { Text } from '@/components/ui/text/text.component';

import styles from './deleteModal.module.scss';
import template from './deleteModal.template.html';

export class DeleteModal extends ChildComponent {
	constructor(id) {
		super();

		this.id = id;
		this.store = Store.getInstance();
		this.element = renderService.htmlToElement(template, [], styles);
	}

	#closeModal = () => {
		$R(document.body).find('#modal').remove();
	};

	#deleteTask = () => {
		$R(document.body).find('#modal').remove();
		this.store.deleteTask(this.id);
	};

	render() {
		$R(this.element)
			.append(new Text('Удалить задачу?').render())
			.append(
				new Button({
					children: 'Удалить',
					type: 'button',
					variant: 'dark-gray',
					onClick: () => this.#deleteTask()
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
