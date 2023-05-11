import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ModalComponent } from '../components/modal/modal.component';
import { PrimaryButtonComponent } from '../components/primary-button/primary-button.component';
import { PrimaryAnchorComponent } from '../components/primary-anchor/primary-anchor.component';
import { ArrowLeftIcon } from '../components/icons/arrow-left.icon';
import { ArrowRightIcon } from '../components/icons/arrow-right.icon';
import { InfoIcon } from '../components/icons/info.icon';
import { SearchIcon } from '../components/icons/search.icon';
import { WikiIcon } from '../components/icons/wiki.icon';
import { MarvelIcon } from '../components/icons/marvel.icon';
import { CloseIcon } from '../components/icons/close.icon';
import { FormsModule } from '@angular/forms';
import { UploadIcon } from '../components/icons/upload.icon';
import { PrimaryFileInputComponent } from '../components/primary-file-input/primary-file-input.component';
import { DirectivesModule } from './directives.module';

const icons: Array<any> = [ArrowLeftIcon, ArrowRightIcon, CloseIcon, InfoIcon, MarvelIcon, SearchIcon, UploadIcon, WikiIcon];

const general: Array<any> = [SpinnerComponent, ModalComponent, PrimaryAnchorComponent, PrimaryButtonComponent, PrimaryFileInputComponent];

const modules: Array<any> = [
	/** Specific Components Modules Here */
];

@NgModule({
	declarations: [...icons, ...general, ...modules],
	imports: [CommonModule, FormsModule, DirectivesModule],
	exports: [...icons, ...general, ...modules],
})
export class ComponentsModule {}
