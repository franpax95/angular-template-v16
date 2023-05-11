import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	constructor(private settings: SettingsService) {}

	public ngOnInit(): void {
		// setTimeout(() => (this.settings.loading = true), 500);
		// setTimeout(() => (this.settings.loading = false), 1000);
		// setTimeout(() => (this.settings.loading = true), 1500);
		// setTimeout(() => (this.settings.loading = false), 2000);
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
