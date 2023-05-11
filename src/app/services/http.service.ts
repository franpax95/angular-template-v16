import { Injectable } from '@angular/core';
import APP_CONFIG from '../app.config';
import { SettingsService } from './settings.service';
import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

export enum HTTP_METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export interface IHttpRequestConfig {
	headers?: { [key: string]: string };
	timeout?: number;
	errorModal?: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class HttpService {
	/** APP Base Url */
	public readonly BASE_URL: string = APP_CONFIG.BASE_URL;
	/** Max Time to Timeout an Http call */
	public readonly DEFAULT_HTTP_TIMEOUT: number = APP_CONFIG.HTTP_TIMEOUT;
	/** HTTP Headers by default */
	public readonly DEFAULT_HTTP_HEADERS: { [key: string]: string } = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};
	/** Indicates if the error modal is shown by default */
	public readonly DEFAULT_HTTP_ERROR_MODAL: boolean = true;

	constructor(private settings: SettingsService) {}

	/**
	 * GET Handler
	 */
	public async get(url: string, body: { [key: string]: unknown } | null = null, config: IHttpRequestConfig = {}): Promise<AxiosResponse<any, any>> {
		// Get Default Values
		const headers: { [key: string]: string } = config.headers || this.DEFAULT_HTTP_HEADERS;
		const timeout: number = typeof config.timeout === 'number' ? config.timeout : this.DEFAULT_HTTP_TIMEOUT;
		const errorModal: boolean = typeof config.errorModal === 'boolean' ? config.errorModal : this.DEFAULT_HTTP_ERROR_MODAL;

		// Preparamos la URL mediante un método de ayuda
		const completeUrl: string = this.getCompleteUrl(url, body);

		// Preparamos la configuración como objeto tipo AxiosRequestConfig
		const reqConfig: AxiosRequestConfig = { headers };

		// Preparamos la cancelación de llamada por TIMEOUT, según el pasado por configuración
		const source: CancelTokenSource = axios.CancelToken.source();
		let timer: NodeJS.Timeout = setTimeout(() => {}, 0);

		if (timeout) {
			timer = setTimeout(() => {
				source.cancel(`HTTP_REQUEST_TIMEOUT: ${timeout}ms`);
			}, timeout);
		}

		// Devolvemos la llamada
		return axios
			.get(completeUrl, { ...reqConfig, cancelToken: source.token })
			.then(res => {
				if (timeout !== null) {
					clearTimeout(timer);
				}

				return res;
			})
			.catch(error => {
				console.error(error);

				if (errorModal) {
					this.settings.openModal({
						title: 'Error',
						content: ['Están habiendo problemas para obtener la información. Por favor, inténtelo de nuevo más tarde.'],
					});
				}

				return Promise.reject(error);
			});
	}

	/**
	 * POST Handler
	 */
	public async post(url: string, body: { [key: string]: unknown } | null = null, config: IHttpRequestConfig = {}): Promise<AxiosResponse<any, any>> {
		// Get Default Values
		const headers: { [key: string]: string } = config.headers || this.DEFAULT_HTTP_HEADERS;
		const timeout: number = typeof config.timeout === 'number' ? config.timeout : this.DEFAULT_HTTP_TIMEOUT;
		const errorModal: boolean = typeof config.errorModal === 'boolean' ? config.errorModal : this.DEFAULT_HTTP_ERROR_MODAL;

		// Preparamos la URL mediante un método de ayuda
		const completeUrl: string = this.getCompleteUrl(url, null, HTTP_METHOD.POST);

		// Preparamos la configuración como objeto tipo AxiosRequestConfig
		const reqConfig: AxiosRequestConfig = { headers };

		// Preparamos la cancelación de llamada por TIMEOUT, según el pasado por configuración
		const source: CancelTokenSource = axios.CancelToken.source();
		let timer: NodeJS.Timeout = setTimeout(() => {}, 0);

		if (timeout) {
			timer = setTimeout(() => {
				source.cancel(`HTTP_REQUEST_TIMEOUT: ${timeout}ms`);
			}, timeout);
		}

		// Devolvemos la llamada
		return axios
			.post(completeUrl, body, { ...reqConfig, cancelToken: source.token })
			.then(res => {
				if (timeout !== null) {
					clearTimeout(timer);
				}

				return res;
			})
			.catch(error => {
				console.error(error);

				if (errorModal) {
					this.settings.openModal({
						title: 'Error',
						content: ['Están habiendo problemas para obtener la información. Por favor, inténtelo de nuevo más tarde.'],
					});
				}

				return Promise.reject(error);
			});
	}

	/**
	 * PUT Handler
	 */
	public async put(url: string, body: { [key: string]: unknown } | null = null, config: IHttpRequestConfig = {}): Promise<AxiosResponse<any, any>> {
		// Get Default Values
		const headers: { [key: string]: string } = config.headers || this.DEFAULT_HTTP_HEADERS;
		const timeout: number = typeof config.timeout === 'number' ? config.timeout : this.DEFAULT_HTTP_TIMEOUT;
		const errorModal: boolean = typeof config.errorModal === 'boolean' ? config.errorModal : this.DEFAULT_HTTP_ERROR_MODAL;

		// Preparamos la URL mediante un método de ayuda
		const completeUrl: string = this.getCompleteUrl(url, null, HTTP_METHOD.POST);

		// Preparamos la configuración como objeto tipo AxiosRequestConfig
		const reqConfig: AxiosRequestConfig = { headers };

		// Preparamos la cancelación de llamada por TIMEOUT, según el pasado por configuración
		const source: CancelTokenSource = axios.CancelToken.source();
		let timer: NodeJS.Timeout = setTimeout(() => {}, 0);

		if (timeout) {
			timer = setTimeout(() => {
				source.cancel(`HTTP_REQUEST_TIMEOUT: ${timeout}ms`);
			}, timeout);
		}

		// Devolvemos la llamada
		return axios
			.put(completeUrl, body, { ...reqConfig, cancelToken: source.token })
			.then(res => {
				if (timeout !== null) {
					clearTimeout(timer);
				}

				return res;
			})
			.catch(error => {
				console.error(error);

				if (errorModal) {
					this.settings.openModal({
						title: 'Error',
						content: ['Están habiendo problemas para obtener la información. Por favor, inténtelo de nuevo más tarde.'],
					});
				}

				return Promise.reject(error);
			});
	}

	/**
	 * DELETE Handler
	 */
	public async delete(url: string, body: { [key: string]: unknown } | null = null, config: IHttpRequestConfig = {}): Promise<AxiosResponse<any, any>> {
		// Get Default Values
		const headers: { [key: string]: string } = config.headers || this.DEFAULT_HTTP_HEADERS;
		const timeout: number = typeof config.timeout === 'number' ? config.timeout : this.DEFAULT_HTTP_TIMEOUT;
		const errorModal: boolean = typeof config.errorModal === 'boolean' ? config.errorModal : this.DEFAULT_HTTP_ERROR_MODAL;

		// Preparamos la URL mediante un método de ayuda
		const completeUrl: string = this.getCompleteUrl(url, body, HTTP_METHOD.DELETE);

		// Preparamos la configuración como objeto tipo AxiosRequestConfig
		const reqConfig: AxiosRequestConfig = { headers };

		// Preparamos la cancelación de llamada por TIMEOUT, según el pasado por configuración
		const source: CancelTokenSource = axios.CancelToken.source();
		let timer: NodeJS.Timeout = setTimeout(() => {}, 0);

		if (timeout) {
			timer = setTimeout(() => {
				source.cancel(`HTTP_REQUEST_TIMEOUT: ${timeout}ms`);
			}, timeout);
		}

		// Devolvemos la llamada
		return axios
			.delete(completeUrl, { ...reqConfig, cancelToken: source.token })
			.then(res => {
				if (timeout !== null) {
					clearTimeout(timer);
				}

				return res;
			})
			.catch(error => {
				console.error(error);

				if (errorModal) {
					this.settings.openModal({
						title: 'Error',
						content: ['Están habiendo problemas para obtener la información. Por favor, inténtelo de nuevo más tarde.'],
					});
				}

				return Promise.reject(error);
			});
	}

	/**
	 * Helper para obtener la url completa
	 */
	public getCompleteUrl(url: string, params: { [key: string]: unknown } | null, method: HTTP_METHOD = HTTP_METHOD.GET): string {
		switch (method) {
			case HTTP_METHOD.POST:
			case HTTP_METHOD.PUT:
				return `${this.BASE_URL}${url}`;

			default:
				const body: string = params ? `?${this.stringifyUrlParams(params)}` : '';
				return `${this.BASE_URL}${url}${body}`;
		}
	}

	/**
	 * Devuelve los parámetros de un objeto de primer nivel dado en formato SOAP: ...?key=value&key=value...
	 *
	 * @param data  Objeto con los parámetros. La profundidad del objeto debe ser de 1.
	 * @returns     String con la cadena formateada
	 */
	private stringifyUrlParams(data: { [key: string]: unknown }): string {
		const entries: Array<Array<string | unknown>> = Object.entries(data);
		const params: string = entries
			.filter((entry: Array<string | unknown>) => entry[1] !== '' && entry[1] !== null && entry[1] !== -1)
			.map((entry: Array<string | unknown>) => {
				const [key, value] = entry;

				if (typeof value === 'string') {
					return `${key}=${value.replace(/\s/g, '%20')}`;
				} else if (typeof value === 'number' || typeof value === 'boolean') {
					return `${key}=${value}`;
				}

				return '';
			})
			.filter((str: string) => str !== '')
			.join('&');

		return params;
	}
}
