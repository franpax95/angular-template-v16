import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
	selector: '[appDropFiles]',
})
export class DropFilesDirective {
	/** Enables shake animation */
	@HostBinding('class.shaking') public fileOver: boolean = false;
	/** 'click' event emitter */
	@Output() public filesDropped: EventEmitter<FileList> = new EventEmitter<FileList>();

	constructor() {}

	// Dragover listener
	@HostListener('dragover', ['$event']) public onDragOver(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();

		this.fileOver = true;
	}

	// Dragleave listener
	@HostListener('dragleave', ['$event']) public onDragLeave(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();

		this.fileOver = false;
	}

	// Drop listener
	@HostListener('drop', ['$event']) public onDrop(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();

		this.fileOver = false;
		const files: FileList | undefined = event.dataTransfer?.files;
		if (files && files.length > 0) {
			console.dir(`You dropped ${files.length} files.`);
			this.filesDropped.emit(files);
		}
	}
}
