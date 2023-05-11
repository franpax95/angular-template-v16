import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-close-icon',
	template: `<svg
		xmlns="http://www.w3.org/2000/svg"
		class="icon icon-tabler icon-tabler-x"
		width="60px"
		height="60px"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		fill="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
		<path d="M18 6l-12 12"></path>
		<path d="M6 6l12 12"></path>
	</svg>`,
	encapsulation: ViewEncapsulation.None,
})
export class CloseIcon {
	constructor() {}
}
