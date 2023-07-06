import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import styles from './text.module.scss';
import template from './text.template.html';

export class Text extends ChildComponent {
	constructor(text = '') {
		super();
		this.text = text;
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$R(this.element).text(this.text);

		return this.element;
	}
}
