import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { Store } from '@/core/store/store';

import { Button } from '@/components/ui/button/button.component';
import { Text } from '@/components/ui/text/text.component';

import styles from './resetBlockModal.module.scss';
import template from './resetBlockModal.template.html';

export class ResetBlockModal extends ChildComponent {
	constructor() {
		super();

		this.store = Store.getInstance();
		this.element = renderService.htmlToElement(template, [], styles);
	}

	#closeModal = () => {
		$R(document.body).find('#modal').remove();
	};

	#resetBlock = () => {
		this.store.clearBlock();
		$R(document.body).find('#buttonsList').hide();
		$R(document.body).find("[name='title-block']").value('');
		$R(document.body).find('#modal').remove();
	};

	render() {
		$R(this.element)
			.append(new Text('Сбросить все данные?').render())
			.append(
				new Button({
					children: 'Сбросить',
					type: 'button',
					variant: 'dark-gray',
					onClick: () => this.#resetBlock()
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
