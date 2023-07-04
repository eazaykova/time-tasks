import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';

import styles from './home.module.scss';
import template from './home.template.html';

export class Home extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [], styles);
		return this.element;
	}
}
