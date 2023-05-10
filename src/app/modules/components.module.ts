import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ModalComponent } from '../components/modal/modal.component';
import { PrimaryButtonComponent } from '../components/primary-button/primary-button.component';

const general: Array<any> = [SpinnerComponent, ModalComponent, PrimaryButtonComponent];

const modules: Array<any> = [
	/** Specific Components Modules Here */
];

@NgModule({
	declarations: [...general, ...modules],
	imports: [CommonModule],
	exports: [...general, ...modules],
})
export class ComponentsModule {}
