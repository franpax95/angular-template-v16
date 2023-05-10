import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { SettingsService } from './services/settings.service';
import { Subscription } from 'rxjs';
import { SpinnerSize } from './components/spinner/spinner.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	/** Show a screen spinner */
	public loading: boolean;
	/** Loading Var Subscription from SettingsService */
	public loadingSubscription!: Subscription;

	constructor(private settings: SettingsService, private viewRef: ViewContainerRef) {
		// Get loading var from settings service
		this.loading = settings.loading;

		// We set the viewRef of the root component first
		settings.viewRef = viewRef;
	}

	get SpinnerSize(): typeof SpinnerSize {
		return SpinnerSize;
	}

	public ngOnInit(): void {
		this.loadingSubscription = this.settings.loadingObs.subscribe((loading: boolean) => (this.loading = loading));

		this.settings.openModal({
			title: 'Prueba',
			content: ['¡Funciona!'],
		});
	}

	public ngOnDestroy(): void {
		if (this.loadingSubscription) {
			this.loadingSubscription.unsubscribe();
		}
	}
}
