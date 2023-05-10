import { AfterContentInit, Component, ElementRef, Input } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Modal } from './parent.modal.component';

export interface IModal {
	title: string;
	content?: Array<string>;
	list?: Array<string>;
	onAccept?: () => void | boolean;
	onCancel?: () => void | boolean;
}

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends Modal implements AfterContentInit {
	/** Variable con el nombre de la clase del modal */
	public override readonly CLASSNAME: string = 'PrimaryModalComponent';

	/** Objeto configuración del modal */
	@Input() public conf!: IModal;
	/** Profundidad (z-index) del modal */
	@Input() public level: number = 0;

	constructor(private settings: SettingsService, protected override host: ElementRef<HTMLElement>) {
		super(host);
	}

	public ngAfterContentInit(): void {
		setTimeout(() => {
			const acceptBtn: HTMLButtonElement | null = <HTMLButtonElement>(
				document.getElementById(`primary-modal-success-btn-${this.level}`)
			);
			const cancelBtn: HTMLButtonElement | null = <HTMLButtonElement>(
				document.getElementById(`primary-modal-danger-btn-${this.level}`)
			);
			const defaultBtn: HTMLButtonElement | null = <HTMLButtonElement>(
				document.getElementById(`primary-modal-default-btn-${this.level}`)
			);

			// Comprobamos primero el botón por defecto, sino el de aceptar y, por último, el de cancelar
			if (defaultBtn) {
				defaultBtn.focus();
			} else if (acceptBtn) {
				acceptBtn.focus();
			} else if (cancelBtn) {
				cancelBtn.focus();
			}
		}, 100);
	}

	/**
	 * Manejador de eventos de 'Aceptar'.
	 * Ejecuta el callback 'onAccept' y cierra el modal si éste va bien.
	 */
	public onAcceptClick(event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();

		// Si se pasa callback y devuelve 'true', cierra el modal.
		if (this.conf && this.conf.onAccept !== undefined) {
			const success: boolean | void = this.conf.onAccept();
			if (success !== false) {
				this.settings.closeModal();
			}
		} else {
			this.settings.closeModal();
		}
	}

	/**
	 * Manejador de eventos de 'Cancelar'.
	 * Ejecuta el callback 'onCancel' y cierra el modal si éste va bien.
	 */
	public onCancelClick(event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();

		// Si se pasa callback y devuelve 'true', cierra el modal.
		if (this.conf && this.conf.onCancel !== undefined) {
			const success: boolean | void = this.conf.onCancel();
			if (success !== false) {
				this.settings.closeModal();
			}
		} else {
			this.settings.closeModal();
		}
	}

	/**
	 * Manejador de eventos del botón por defecto.
	 * Cierra el modal.
	 */
	public onDefaultClick(event: MouseEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.settings.closeModal();
	}
}
