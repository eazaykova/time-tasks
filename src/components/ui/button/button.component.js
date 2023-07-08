import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import styles from './button.module.scss';
import template from './button.template.html';

export class Button extends ChildComponent {
	constructor({ children, onClick, type, variant, name }) {
		super();

		if (!children) throw new Error('Children is empty!');
		this.children = children;
		this.onClick = onClick;
		this.type = type;
		this.variant = variant;
		this.name = name;
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$R(this.element).html(this.children).click(this.onClick);

		if (this.type) $R(this.element).attr('type', this.type);
		if (this.name) $R(this.element).attr('name', this.name);

		if (this.variant) $R(this.element).addClass(styles[this.variant]);

		return this.element;
	}
}
