import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import { Button } from '@/components/ui/button/button.component';
import { Text } from '@/components/ui/text/text.component';

import styles from './messageModal.module.scss';
import template from './messageModal.template.html';

export class MessageModal extends ChildComponent {
	constructor(message) {
		super();
		this.message = message;
	}

	#closeModal = () => {
		$R(document.body).find('#modal').remove();
	};

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Text(this.message),
				new Button({
					children: 'ОК',
					type: 'button',
					variant: 'dark-gray',
					onClick: () => this.#closeModal()
				})
			],
			styles
		);
		return this.element;
	}
}
