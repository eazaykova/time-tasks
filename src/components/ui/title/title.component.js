import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import styles from './title.module.scss';
import template from './title.template.html';

export class Title extends ChildComponent {
	constructor(title = '') {
		super();
		this.title = title;
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$R(this.element).text(this.title);

		return this.element;
	}
}
