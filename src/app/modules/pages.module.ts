import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const modules: Array<any> = [
	/** Pages Components Here */
];

@NgModule({
	declarations: [...modules],
	imports: [CommonModule],
	exports: [...modules],
})
export class PagesModule {}
