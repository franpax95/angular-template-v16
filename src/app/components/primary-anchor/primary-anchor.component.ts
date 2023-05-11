import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IPrimaryAnchor {
	content?: string;
	id?: string;
	type?: string;
	disabled?: boolean;
	className?: string;
	styles?: any;
	tooltip?: string;
	tooltipPlacement?: string;
	ngClick?: (event: MouseEvent) => void;
}

@Component({
	selector: 'app-primary-anchor',
	templateUrl: './primary-anchor.component.html',
	styleUrls: ['./primary-anchor.component.scss'],
})
export class PrimaryAnchorComponent {
	/** 'Id' attribute */
	@Input() public id: string = '';
	/** 'Disabled' attribute */
	@Input() public disabled: boolean = false;
	/** 'href' attribute */
	@Input() public href: string = '';
	/** Additional styles */
	@Input() public styles: any = {};
	/** Tooltip message. If empty, no tooltip will show. */
	@Input() public tooltip: string = '';
	/** Determines possition of the tooltip. 'top', 'bottom', 'left', 'right' as possible values.  */
	@Input() public tooltipPlacement: string = 'top';
	/** Click callback on event handling */
	@Input() public ngClickCb: (event: MouseEvent) => void = () => {};
	/** 'click' event emitter */
	@Output() public ngClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

	/**
	 * ClassName of the button/link. There is some classNames predefined:
	 * @note 'success': Green color styles
	 * @note 'danger': Red color styles
	 * @note 'secondary': Secondary color styles
	 *
	 * @note 'sm': Small size button
	 * @note 'lg': Large size button
	 */
	@Input() public className: string = '';

	constructor() {}

	/**
	 * Manejador de eventos 'click' del botón
	 */
	public onAnchorClick(event: MouseEvent): void {
		if (this.ngClickCb) {
			this.ngClickCb(event);
		}

		this.ngClick.emit(event);
	}
}
