import { Directive, Input, Output, EventEmitter, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Observable, Subscription } from 'rxjs';

@Directive({
	selector: '[appIntersectionObserver]',
	exportAs: 'intersection',
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
	@Input() public root: HTMLElement | null = null;
	@Input() public rootMargin: string = '0px 0px 0px 0px';
	@Input() public threshold: number = 0;
	@Input() public debounceTime: number = 250;
	@Input() public isContinuous: boolean = false;
	@Output() public isIntersecting: EventEmitter<boolean> = new EventEmitter<boolean>();

	public intersecting: boolean = false;
	private subscription!: Subscription;

	constructor(private element: ElementRef) {}

	public ngOnInit(): void {
		this.subscription = this.createAndObserve();
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	public createAndObserve(): Subscription {
		const options: IntersectionObserverInit = {
			root: this.root,
			rootMargin: this.rootMargin,
			threshold: this.threshold,
		};

		return new Observable<boolean>(subscriber => {
			const intersectionObserver: IntersectionObserver = new IntersectionObserver(entries => {
				const { isIntersecting } = entries[0];
				subscriber.next(isIntersecting);

				if (isIntersecting && !this.isContinuous) {
					intersectionObserver.disconnect();
				}
			}, options);

			intersectionObserver.observe(this.element.nativeElement);

			return {
				unsubscribe(): void {
					intersectionObserver.disconnect();
				},
			};
		})
			.pipe(debounceTime(this.debounceTime))
			.subscribe(status => {
				this.isIntersecting.emit(status);
				this.intersecting = status;
			});
	}
}
