import ChildComponent from '@/core/component/child.component';
import { $R } from '@/core/rquery/rquery.lib';
import renderService from '@/core/services/render.service';
import { StorageService } from '@/core/services/storage.service';
import { Store } from '@/core/store/store';

import styles from './timer.module.scss';
import template from './timer.template.html';

import { Button } from '../ui/button/button.component';

export class Timer extends ChildComponent {
	constructor(titleBlock, idTask, time, closeModal) {
		super();
		this.titleBlock = titleBlock;
		this.idTask = idTask;
		this.time = time;
		this.closeModal = closeModal;
		this.storageService = new StorageService();
		this.store = Store.getInstance();
		this.element = renderService.htmlToElement(template, [], styles);
		this.interval;
	}

	#play = () => {
		let time = $R(this.element).find('#timer').innerText().split(':');
		let h = parseInt(time[0]);
		let m = parseInt(time[1]);

		if (m === 0) {
			if (!h !== 0) {
				h--;
			}
		} else {
			m--;
		}

		this.interval = setInterval(() => {
			$R(this.element)
				.find('#timer')
				.text(`${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m} (h:m)`);

			console.log(`${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m} (h:m)`);
			m--;

			if (m === 0) {
				if (h === 0) {
					$R(this.element).find('#timer').text(`00:00 (h:m)`);
					clearInterval(this.interval);
					this.#sound();
				}

				h--;
				m = 59;
			}
		}, 60000);
	};

	#pause = () => {
		clearInterval(this.interval);
		let newTime = $R(this.element).find('#timer').innerText();
		this.storageService.updateTaskTime(
			this.titleBlock,
			this.idTask,
			newTime.split(' ')[0]
		);
	};

	#sound = () => {
		let audio = new Audio();
		audio.src = '/audio/notification.mp3';
		audio.autoplay = true;
	};

	#closeModal = () => {
		this.#pause();
		$R(document.body).find('#modal').remove();
		this.store.notify();
	};

	render() {
		$R(this.element).find('#timer').text(`${this.time} (h:m)`);

		$R(this.element)
			.append(
				new Button({
					children: 'Пуск',
					type: 'button',
					variant: 'green',
					onClick: () => this.#play()
				}).render()
			)
			.append(
				new Button({
					children: 'Пауза',
					type: 'button',
					variant: 'dark-gray',
					onClick: () => this.#pause()
				}).render()
			)
			.append(
				new Button({
					children: 'X',
					type: 'button',
					variant: 'gray',
					onClick: () => this.#closeModal()
				}).render()
			);

		return this.element;
	}
}
