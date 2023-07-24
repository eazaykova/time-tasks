import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';

import styles from './layout.module.scss';
import template from './layout.template.html';

import { Header } from './header/header.component';

export class Layout extends ChildComponent {
	constructor({ children }) {
		super();
		this.children = children;
		this.element = renderService.htmlToElement(template, [], styles);
	}

	render() {
		const mainElement = $R(this.element).find('main');
		const contentContainer = $R(this.element).find('#content');
		contentContainer.append(this.children);

		mainElement.before(new Header().render()).append(contentContainer.element);

		return this.element;
	}
}
