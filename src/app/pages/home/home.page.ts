import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	/** Base64 for testing primary-file-input */
	public base64: string = '';

	constructor(private settings: SettingsService) {}

	public ngOnInit(): void {
		// setTimeout(() => (this.settings.loading = true), 500);
		// setTimeout(() => (this.settings.loading = false), 1000);
		// setTimeout(() => (this.settings.loading = true), 1500);
		// setTimeout(() => (this.settings.loading = false), 2000);
	}

	/**
	 * Add a character page if intersecting
	 */
	public isIntersecting(entry: IntersectionObserverEntry): void {
		const { isIntersecting, target, intersectionRect, rootBounds } = entry;
		const isBelow: boolean = intersectionRect.bottom !== rootBounds?.bottom;

		if (isIntersecting && !target.classList.contains('active')) {
			target.classList.add('active');
		} else if (!isIntersecting && target.classList.contains('active') && !isBelow) {
			target.classList.remove('active');
		}
	}

	/**
	 * File input handler
	 */
	public onFileInputChange(base64: string): void {
		this.base64 = base64;
	}

	/**
	 * 'Click' handler
	 */
	public onClick(): void {
		this.settings.openModal({
			// title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus faucibus turpis et ultrices. Donec.',
			title: '⚠️ Nulla tempor quis.',
			content: [
				'👍 Pellentesque porttitor, nisi vulputate egestas semper, risus magna scelerisque risus, at scelerisque ligula turpis sed.',
				'✅ Nulla tempor quis.',
				'👉 Phasellus in ex nec ex vestibulum rhoncus ullamcorper sit amet urna. In hac habitasse platea dictumst. Aliquam pretium a risus.',
			],
			onAccept: () => {},
			onCancel: () => {},
		});
	}
}
