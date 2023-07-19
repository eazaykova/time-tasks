import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import styles from './field.module.scss';
import template from './field.template.html';

export class Field extends ChildComponent {
	constructor({
		placeholder,
		type = 'text',
		value = '',
		name,
		variant,
		onClick
	}) {
		super();
		if (!name) throw new Error('Please fill field "name"!');

		this.placeholder = placeholder;
		this.type = type;
		this.value = value;
		this.name = name;
		this.variant = variant;
		this.onClick = onClick;
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);
		if (this.type === 'time') {
			$R(this.element).find('input').input({
				type: this.type,
				name: this.name,
				id: this.name
			});
		} else if (this.type === 'checkbox') {
			$R(this.element)
				.find('input')
				.input({
					type: this.type,
					name: this.name
				})
				.click(this.onClick);
		} else {
			$R(this.element).find('input').input({
				placeholder: this.placeholder,
				type: this.type,
				value: this.value,
				name: this.name
			});
		}

		return this.element;
	}
}
