import { ComponentRef, Injectable, ViewContainerRef, WritableSignal, effect, signal } from '@angular/core';
import { IModal, ModalComponent } from '../components/modal/modal.component';

@Injectable({
	providedIn: 'root',
})
export class SettingsService {
	/** Signal to watch loading var */
	private _loading: WritableSignal<boolean> = signal<boolean>(false);
	/** Signal to receive main ViewRefContainer and emit it since here */
	private _viewRef: WritableSignal<ViewContainerRef | null> = signal<ViewContainerRef | null>(null);

	/** Array de las referencias a las instancias de modales */
	private modalRefs: Array<ComponentRef<ModalComponent>> = [];

	constructor() {
		effect(() => console.dir(`loading = ${this._loading()}`), { allowSignalWrites: true });
	}

	// Loading Signal getter
	get loadingSignal(): WritableSignal<boolean> {
		return this._loading;
	}

	// Current loading value getter
	get loading(): boolean {
		return this._loading();
	}

	// Loading value setter
	set loading(value: boolean) {
		this._loading.set(value);
	}

	// ViewContainerRef of the root Observable getter
	get viewRefSignal(): WritableSignal<ViewContainerRef | null> {
		return this._viewRef;
	}

	// ViewContainerRef of the root value getter
	get viewRef(): ViewContainerRef | null {
		return this._viewRef();
	}

	// ViewContainerRef of the root value setter
	set viewRef(value: ViewContainerRef | null) {
		this._viewRef.set(value);
	}

	/**
	 * Open a new Modal, that overflows the current one, if it exists.
	 */
	public openModal(conf: IModal): void {
		if (!this.viewRef) {
			console.error('ERROR: Modal cannot be opened as there is no ViewContainerRef defined...');
			return;
		}

		const componentRef: ComponentRef<ModalComponent> = this.viewRef.createComponent(ModalComponent);
		componentRef.instance.conf = conf;
		componentRef.instance.level = this.modalRefs.length;
		componentRef.hostView.detectChanges();
		this.modalRefs.push(componentRef);

		componentRef.instance.afterClose.subscribe(() => {
			componentRef.destroy();
		});
	}

	/**
	 * Close all modals.
	 */
	public closeAllModals(): void {
		if (this.modalRefs.length > 0) {
			// Cerramos todos los modales
			for (let i: number = 0; i < this.modalRefs.length; i++) {
				this.modalRefs[i].instance.close();
			}

			// Reiniciamos la variable con los modales
			this.modalRefs = [];
		}
	}

	/**
	 * Close the last modal opened.
	 */
	public closeModal(): void {
		if (this.modalRefs.length > 0) {
			const componentRef: ComponentRef<ModalComponent> | undefined = this.modalRefs.pop();

			if (componentRef) {
				componentRef.instance.close();
			}
		}
	}
}
