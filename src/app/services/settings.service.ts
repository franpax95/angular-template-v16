import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IModal, ModalComponent } from '../components/modal/modal.component';

@Injectable({
	providedIn: 'root',
})
export class SettingsService {
	/** Behaviour Subject to watch loading var */
	private loadingSub: BehaviorSubject<boolean> = new BehaviorSubject(false);
	/** Behaviour Subject to receive main ViewRefContainer and emit it since here */
	private viewRefSub: BehaviorSubject<ViewContainerRef | null> = new BehaviorSubject(<ViewContainerRef | null>null);

	/** Array de las referencias a las instancias de modales */
	private modalRefs: Array<ComponentRef<ModalComponent>> = [];

	constructor() {}

	// Loading Observable getter
	get loadingObs(): Observable<boolean> {
		return this.loadingSub.asObservable();
	}

	// Current loading value getter
	get loading(): boolean {
		return this.loadingSub.getValue();
	}

	// Loading value setter
	set loading(value: boolean) {
		this.loadingSub.next(value);
	}

	// ViewContainerRef of the root Observable getter
	get viewRefObs(): Observable<ViewContainerRef | null> {
		return this.viewRefSub.asObservable();
	}

	// ViewContainerRef of the root value getter
	get viewRef(): ViewContainerRef | null {
		return this.viewRefSub.getValue();
	}

	// ViewContainerRef of the root value setter
	set viewRef(value: ViewContainerRef | null) {
		this.viewRefSub.next(value);
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
