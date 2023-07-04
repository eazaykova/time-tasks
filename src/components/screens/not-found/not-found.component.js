import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';

import template from './not-found.template.html';

export class NotFound extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, []);
		return this.element;
	}
}
