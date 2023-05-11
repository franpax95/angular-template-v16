import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IntersectionObserverDirective } from '../directives/intersection-observer.directive';
import { DropFilesDirective } from '../directives/drop-files.directive';

const modules: Array<any> = [IntersectionObserverDirective, DropFilesDirective];

@NgModule({
	declarations: [...modules],
	imports: [CommonModule],
	exports: [...modules],
})
export class DirectivesModule {}
