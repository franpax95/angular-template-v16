import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public title: string = 'angular-template-v16';

	public arr: Array<number> = [1, 2];

	public Juan: string = 'Fran';

	/** Comment */
	public comment: string = 'Comments';

	constructor() {}

	public ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	public method1(): void {
		console.dir('method1');
	}

	public method2(): void {
		console.dir('method2');
		console.dir('');
		console.dir('Juan');
		const ok: boolean | null = true;
		const Juan: string = 'juan';

		const array: Array<number> = [1, 2];
		const obj: any = { Juan, array: { Juan } };
	}
}
