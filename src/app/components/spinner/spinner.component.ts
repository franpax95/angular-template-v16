import { Component, Input } from '@angular/core';

export enum SpinnerSize {
	SMALL = 'sm',
	MEDIUM = 'md',
	BIG = 'lg',
}

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
	/** Spinner size receive as Input */
	@Input() public size: SpinnerSize = SpinnerSize.MEDIUM;
	/** Spinner color */
	@Input() public color: string = '';
}
