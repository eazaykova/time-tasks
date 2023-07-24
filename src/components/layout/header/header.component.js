import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';

import styles from './header.module.scss';
import template from './header.template.html';

import { Logo } from './logo/logo.component';

export class Header extends ChildComponent {
	render() {
		this.element = renderService.htmlToElement(template, [Logo], styles);
		return this.element;
	}
}
