import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DebugPipe } from '../pipes/debug.pipe';

const modules: Array<any> = [DebugPipe];

@NgModule({
	declarations: [...modules],
	imports: [CommonModule],
	exports: [...modules],
})
export class PipesModule {}
