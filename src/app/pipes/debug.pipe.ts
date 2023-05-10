import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'debug',
})
export class DebugPipe implements PipeTransform {
	public transform(value: unknown, ...args: unknown[]): unknown {
		console.dir(value);
		console.dir(args);
		return value;
	}
}
