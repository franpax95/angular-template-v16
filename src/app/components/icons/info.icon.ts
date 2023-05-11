import { Component } from '@angular/core';

@Component({
	selector: 'app-info-icon',
	template: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30" fill="currentColor" width="60px" height="60px">
		<path
			d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,21h-2v-7h2V21z M15,11.5c-0.828,0-1.5-0.672-1.5-1.5s0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5S15.828,11.5,15,11.5z"
		/>
	</svg>`,
})
export class InfoIcon {
	constructor() {}
}
