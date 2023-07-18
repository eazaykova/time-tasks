import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { StorageService } from '@/core/services/storage.service';
import { Store } from '@/core/store/store';

import styles from './blocks-list.module.scss';
import template from './blocks-list.template.html';

import { BlockItem } from './block-item/block-item.component';
import { BLOCKS_KEY } from '@/constants/blocks.constants';

export class BlocksList extends ChildComponent {
	constructor() {
		super();

		this.storageService = new StorageService();
		this.store = Store.getInstance();
		this.store.addObserver(this);
		this.element = renderService.htmlToElement(template, [], styles);
	}

	update() {
		this.blocks = this.storageService.getItem(BLOCKS_KEY);
		$R(this.element).text('');

		if (this.blocks) {
			if (this.blocks.length > 0) {
				this.blocks.forEach(block => {
					$R(this.element).append(new BlockItem(block).render());
				});
			} else {
				$R(this.element).text('Блоки еще не добавлены!');
			}
		} else {
			$R(this.element).text('Блоки еще не добавлены!');
		}
	}

	render() {
		this.update();
		return this.element;
	}
}
