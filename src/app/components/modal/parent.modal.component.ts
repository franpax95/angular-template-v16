import { ElementRef, EventEmitter, Inject, Output } from '@angular/core';

/**
 * Parent with the mount/unmount logic of programmatic modals
 */
@Inject({})
export class Modal {
	/** Nombre del keyframe (CSS) de la animación de movimiento de salida */
	protected readonly ANIMATION_TRANSLATE_OUT: string = 'ModalTranslateOut';
	/** Nombre del keyframe (CSS) de la animación de opacidad de salida */
	protected readonly ANIMATION_FADE_OUT: string = 'ModalFadeOut';
	/** Variable con el nombre de la clase del modal */
	public readonly CLASSNAME: string = 'modal-component';
	/** Dispara un evento cuando se ha terminado la animación de salida, en el método 'animationDone' */
	@Output() public afterClose: EventEmitter<boolean> = new EventEmitter();

	constructor(protected host: ElementRef<HTMLElement>) {}

	get container(): HTMLElement {
		return this.host.nativeElement.querySelector(`.${this.CLASSNAME}`) as HTMLElement;
	}

	get modal(): HTMLElement {
		return this.host.nativeElement.querySelector(`.${this.CLASSNAME} .modal`) as HTMLElement;
	}

	/**
	 * Manejador de eventos cuando acaba la transición de salida del modal, para destruirlo cuando termina
	 */
	public animationDone(event: AnimationEvent): void {
		if (event.animationName === this.ANIMATION_FADE_OUT) {
			this.afterClose.emit(true);
		}
	}

	/**
	 * Activa la animación de salida antes de cerrar el componente.
	 * Cuando la animación acaba, salta el método 'animationDone'.
	 */
	public close(): void {
		this.modal.style.animation = `${this.ANIMATION_TRANSLATE_OUT} .3s`;
		this.container.style.animation = `${this.ANIMATION_FADE_OUT} .4s`;
	}
}
