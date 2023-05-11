import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/settings.service';
import { getPromise } from 'src/utils';
import { fileToBase64, getBase64ContentType } from 'src/utils/files';

@Component({
	selector: 'app-primary-file-input',
	templateUrl: './primary-file-input.component.html',
	styleUrls: ['./primary-file-input.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class PrimaryFileInputComponent implements OnChanges {
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
	/** Indicates if it works with base64 images */
	@Input() public base64: boolean = false;

	/** File input id attribute */
	@Input() public id: string = '';
	/** File input name attribute */
	@Input() public name: string = '';
	/** File input disabled attribute */
	@Input() public disabled: boolean = false;
	/** File input disabled attribute */
	@Input() public accept: string = 'image/*';
	/** Component Title */
	@Input() public title: string = '';

	/** Callback a ejecutar a la hora de hacer change (para parametrizar el componente) */
	@Input() public fileLoadedCb: (event: File | string) => void = () => {};
	/** File event emitter */
	@Output() public fileLoaded: EventEmitter<File | string> = new EventEmitter<File | string>();

	/** If an image is loading */
	public loading: boolean = false;
	/** Base64 without format (since this.value) */
	public base64Loaded: SafeResourceUrl | string = '';
	/** File instance loaded */
	public imageLoaded: File | null = null;

	constructor(private sanitizer: DomSanitizer, private settings: SettingsService) {}

	public async ngOnChanges(changes: SimpleChanges): Promise<void> {
		if (changes['value'] && this.base64) {
			const { currentValue, previousValue, firstChange } = changes['value'];

			const contentType: string = await getBase64ContentType(currentValue);
			this.base64Loaded = currentValue !== '' ? this.sanitizer.bypassSecurityTrustResourceUrl(`${contentType}${currentValue}`) : '';
		}
	}

	public async fileBrowserHandler(event: Event): Promise<void> {
		const target: HTMLInputElement = <HTMLInputElement>event.target;
		const files: FileList | null = target.files;

		if (files && files.length) {
			const file: File = files[0];
			const { size } = file;

			// Comprobamos el tamaño
			if (this.maxSize && size > this.maxSize) {
				this.settings.openModal({
					title: 'Error',
					content: [`El tamaño máximo permitido para la imagen es ${this.maxSize}kb. La imagen subida (${size}kb) supera el límite.`],
				});
				return;
			}

			this.loading = true;
			const b64: File | string = (await fileToBase64(file)) as string;
			const { width, height } = await this.getImage(b64);

			// Height, Width checks
			if (this.maxWidth && this.maxHeight && (width > this.maxWidth || height > this.maxHeight)) {
				this.settings.openModal({
					title: 'Error',
					content: [`La imagen elegida (${width}x${height}) es superior a las dimensiones establecidas. Debes subir una imagen de ${this.maxWidth}x${this.maxHeight}.`],
				});
				this.loading = false;
				return;
			} else if (this.maxWidth && width > this.maxWidth) {
				this.settings.openModal({
					title: 'Error',
					content: [`La imagen elegida (${width}x${height}) supera el límite de ancho establecido de ${this.maxWidth}`],
				});
				this.loading = false;
				return;
			} else if (this.maxHeight && height > this.maxHeight) {
				this.settings.openModal({
					title: 'Error',
					content: [`La imagen elegida (${width}x${height}) supera el límite de alto establecido de ${this.maxHeight}`],
				});
				this.loading = false;
				return;
			}
			this.loading = false;

			// Emit b64 if all conditions are fine
			const base64: string = `${b64}`.split(',')[1];
			const result: File | string = this.base64 ? base64 : file;

			if (this.fileLoadedCb) {
				this.fileLoadedCb(result);
			}
			this.fileLoaded.emit(result);
		}
	}

	public async onFileDropped(files: FileList): Promise<void> {
		console.dir(files);

		const file: File = files[0];
		const { size } = file;

		// Comprobamos el tamaño
		if (this.maxSize && size > this.maxSize) {
			this.settings.openModal({
				title: 'Error',
				content: [`El tamaño máximo permitido para la imagen es ${this.maxSize}kb. La imagen subida (${size}kb) supera el límite.`],
			});
			return;
		}

		this.loading = true;
		const b64: File | string = (await fileToBase64(file)) as string;
		const { width, height } = await this.getImage(b64);

		// Height, Width checks
		if (this.maxWidth && this.maxHeight && (width > this.maxWidth || height > this.maxHeight)) {
			this.settings.openModal({
				title: 'Error',
				content: [`La imagen elegida (${width}x${height}) es superior a las dimensiones establecidas. Debes subir una imagen de ${this.maxWidth}x${this.maxHeight}.`],
			});
			this.loading = false;
			return;
		} else if (this.maxWidth && width > this.maxWidth) {
			this.settings.openModal({
				title: 'Error',
				content: [`La imagen elegida (${width}x${height}) supera el límite de ancho establecido de ${this.maxWidth}`],
			});
			this.loading = false;
			return;
		} else if (this.maxHeight && height > this.maxHeight) {
			this.settings.openModal({
				title: 'Error',
				content: [`La imagen elegida (${width}x${height}) supera el límite de alto establecido de ${this.maxHeight}`],
			});
			this.loading = false;
			return;
		}
		this.loading = false;

		// Emit b64 if all conditions are fine
		const base64: string = `${b64}`.split(',')[1];
		const result: File | string = this.base64 ? base64 : file;

		if (this.fileLoadedCb) {
			this.fileLoadedCb(result);
		}
		this.fileLoaded.emit(result);
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
}
