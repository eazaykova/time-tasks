import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import styles from './modal.module.scss';
import template from './modal.template.html';

export class Modal extends ChildComponent {
	constructor(children) {
		super();

		if (!children) throw new Error('Children is empty!');
		this.children = children;
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$R(this.element).append(this.children);

		return this.element;
	}
}
