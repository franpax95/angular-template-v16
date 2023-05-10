import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IntersectionObserverDirective } from '../directives/intersection-observer.directive';

const modules: Array<any> = [IntersectionObserverDirective];

@NgModule({
	declarations: [...modules],
	imports: [CommonModule],
	exports: [...modules],
})
export class DirectivesModule {}
