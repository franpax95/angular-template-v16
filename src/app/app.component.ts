import { Component, OnDestroy, OnInit, ViewContainerRef, WritableSignal } from '@angular/core';
import { SettingsService } from './services/settings.service';
import { SpinnerSize } from './components/spinner/spinner.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	/** Signal to handle Screen Load Spinner */
	public loading: WritableSignal<boolean>;

	constructor(private settings: SettingsService, private viewRef: ViewContainerRef) {
		// Get loading signal from settings service
		this.loading = settings.loadingSignal;

		// We set the viewRef of the root component first
		settings.viewRef = viewRef;
	}

	get SpinnerSize(): typeof SpinnerSize {
		return SpinnerSize;
	}

	public ngOnInit(): void {
		console.dir('ngOnInit');
	}

	public ngOnDestroy(): void {
		console.dir('ngOnDestroy');
	}

	public fileBrowserHandler(event: Event): void {
		console.dir(event);
	}

	public onFileDropped(files: FileList): void {
		console.dir(files);
	}
}
