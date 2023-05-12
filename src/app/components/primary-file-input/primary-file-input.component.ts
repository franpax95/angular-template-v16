import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/settings.service';
import { getPromise } from 'src/utils';
import { fileToBase64, getBase64ContentType } from 'src/utils/files';
import { SpinnerSize } from '../spinner/spinner.component';

@Component({
	selector: 'app-primary-file-input',
	templateUrl: './primary-file-input.component.html',
	styleUrls: ['./primary-file-input.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class PrimaryFileInputComponent implements OnChanges {
	/** Input File element ref */
	@ViewChild('fileDropRef') public input!: ElementRef<HTMLInputElement>;

	/** Label message */
	@Input() public label: string = 'Browse for file';
	/** Content message */
	@Input() public content: string = 'Drag and Drop File Here or';
	/** Maximum Height of the file loaded */
	@Input() public maxHeight: number | null = null;
	/** Maximum Width of the file loaded */
	@Input() public maxWidth: number | null = null;
	/** Maximum Size of the file loaded */
	@Input() public maxSize: number | null = null;

	/** Component value attr */
	@Input() public value: string = '';
	/** File input id attribute */
	@Input() public id: string = '';
	/** File input name attribute */
	@Input() public name: string = '';
	/** File input disabled attribute */
	@Input() public disabled: boolean = false;
	/** Component Title */
	@Input() public title: string = '';
	/** File input disabled attribute */
	@Input() public accept: string = 'image/*,.pdf';

	/** Callback a ejecutar a la hora de hacer change (para parametrizar el componente) */
	@Input() public fileLoadedCb: (event: File | string) => void = () => {};
	/** File event emitter */
	@Output() public fileLoaded: EventEmitter<string> = new EventEmitter<string>();

	/** If an image is loading */
	public loading: boolean = false;
	/** Base64 without format (since this.value) */
	public base64Loaded: SafeResourceUrl | string = '';
	/** Fade the image while its changing */
	public fade: boolean = false;
	/** Show preview */
	public showPreview: boolean = false;
	/** Indicates if the base64Loaded is an image */
	public isImage: boolean = false;

	constructor(private sanitizer: DomSanitizer, private settings: SettingsService) {}

	get SpinnerSize(): typeof SpinnerSize {
		return SpinnerSize;
	}

	public async ngOnChanges(changes: SimpleChanges): Promise<void> {
		if (changes['value']) {
			const { currentValue } = changes['value'];

			if (currentValue === '' && this.base64Loaded !== '') {
				this.fade = true;
				this.showPreview = false;

				setTimeout(() => {
					this.base64Loaded = '';
					this.fade = false;
				}, 250);
			} else if (currentValue === '') {
				this.base64Loaded = '';
			} else {
				this.fade = this.base64Loaded !== '';

				setTimeout(() => {
					getBase64ContentType(currentValue).then((contentType: string) => {
						this.isImage = contentType.includes('image');

						if (!this.isImage) {
							this.fade = false;
							this.showPreview = true;
						}

						this.base64Loaded = currentValue !== '' ? this.sanitizer.bypassSecurityTrustResourceUrl(`${contentType}${currentValue}`) : '';
					});
				}, 250);
			}
		}
	}

	/**
	 * Input file 'change' event handler
	 */
	public async fileBrowserHandler(event: Event): Promise<void> {
		const target: HTMLInputElement = <HTMLInputElement>event.target;
		const files: FileList | null = target.files;

		if (files && files.length) {
			this.handleImageLoaded(files);
		}
	}

	/**
	 * Clear the value loaded
	 */
	public onCancelClick(event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.emit('');
	}

	/**
	 * DragNDrop event handler
	 */
	public async onFileDropped(files: FileList): Promise<void> {
		this.handleImageLoaded(files);
	}

	/**
	 * img load event handler
	 */
	public onLoad(event: Event): void {
		if (!this.showPreview) {
			this.showPreview = true;
		}

		this.fade = false;
	}

	/**
	 * 'Click' event handler for preview container.
	 * Fire input file event programmatically
	 */
	public onPreviewClick(event: MouseEvent): void {
		this.input.nativeElement.click();
	}

	/*****************************************************************************************************/

	/**
	 * Emit the value pass as parameter
	 */
	private emit(value: string): void {
		if (this.fileLoadedCb) {
			this.fileLoadedCb(value);
		}
		this.fileLoaded.emit(value);
	}

	/**
	 * Shortcut to get an image asynchronously
	 */
	private getImage(b64: string): Promise<HTMLImageElement> {
		const [prom, resolve] = getPromise();
		const img: HTMLImageElement = new Image();

		img.onload = function (): GlobalEventHandlers | any {
			resolve(this);
		};
		img.src = b64;

		return prom;
	}

	/**
	 * The functionality to handle an image
	 */
	private async handleImageLoaded(files: FileList): Promise<void> {
		const file: File = files[0];
		const { size, type } = file;
		const isImage: boolean = type.includes('image');

		// Comprobamos el tamaño
		if (this.maxSize && size > this.maxSize) {
			this.settings.openModal({
				title: 'Error',
				content: [`The maximum size allowed for the file is ${this.maxSize}kb. Uploaded file (${size}kb) exceeds limit.`],
			});
			return;
		}

		this.loading = true;
		const b64: File | string = (await fileToBase64(file)) as string;

		if (isImage) {
			const { width, height } = await this.getImage(b64);

			// Height, Width checks
			if (this.maxWidth && this.maxHeight && (width > this.maxWidth || height > this.maxHeight)) {
				this.settings.openModal({
					title: 'Error',
					content: [`The image size (${width}x${height}) is greater than the established dimensions. The image should not be greater than ${this.maxWidth}x${this.maxHeight}.`],
				});
				this.loading = false;
				return;
			} else if (this.maxWidth && width > this.maxWidth) {
				this.settings.openModal({
					title: 'Error',
					content: [`The image size (${width}x${height}) is greater than the established width dimension. The image should not be wider than ${this.maxWidth}}.`],
				});
				this.loading = false;
				return;
			} else if (this.maxHeight && height > this.maxHeight) {
				this.settings.openModal({
					title: 'Error',
					content: [`The image size (${width}x${height}) is greater than the established height dimension. The image should not be higher than ${this.maxHeight}}.`],
				});
				this.loading = false;
				return;
			}
		}

		this.loading = false;

		// Emit b64 if all conditions are fine
		const base64: string = `${b64}`.split(',')[1];
		this.emit(base64);
	}
}
