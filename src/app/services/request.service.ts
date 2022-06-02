import { Pagination } from '../modules/client/models/pagination.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';

export type CallBackRequest<T> = (success: boolean, responseObject: T | string, totalElements?: number) => void;

@Injectable({
	providedIn: 'root'
})

export class RequestService {

	constructor(protected http: HttpClient) { }

	protected createURL(endpoint: string): string {
		return environment.baseURL + endpoint;
	}

	protected createUrlWithParams(endpoint: string, pagination?: Pagination, searchString?: string): string {
		let url = this.createURL(endpoint);
		if (pagination) {
			url = url + `?_page=${pagination.page}&_limit=${pagination.size}`;
		}
		if (searchString !== '') {
			url = url + searchString;
		}
		return url;
	}

	protected getRequest<T>(endpoint: string, callBack: CallBackRequest<T>, pagination?: Pagination, searchString?: string): void {
		const url = this.createUrlWithParams(endpoint, pagination, searchString);
		this.http.get<T>(url, { observe: 'response' }).subscribe(
			success => {
				if (callBack) callBack(true, Object(success.body), Number(success.headers.get('X-Total-Count')));
			},
			error => {
				const errorMessage =
					error.error?.message || 'Não foi possível conectar-se ao servidor. Tente novamente mais tarde';
				if (callBack) callBack(false, errorMessage);
			},
		);
	}

	protected getRequestById<T>(endpoint: string, callBack: CallBackRequest<T>): void {
		const url = this.createURL(endpoint);
		this.http.get<T>(url).subscribe(
			success => {
				if (callBack) callBack(true, success);
			},
			error => {
				const errorMessage =
					error.error?.message || 'Não foi possível conectar-se ao servidor. Tente novamente mais tarde';
				if (callBack) callBack(false, errorMessage);
			},
		);
	}

	protected postRequest<T>(endpoint: string, params: object, callBack: CallBackRequest<T>): void {
		const url = this.createURL(endpoint);
		this.http.post<T>(url, params).subscribe(
			success => {
				if (callBack) callBack(true, success);
			},
			error => {
				const errorMessage =
					error.error?.message || 'Não foi possível conectar-se ao servidor. Tente novamente mais tarde';
				if (callBack) callBack(false, errorMessage);
			},
		);
	}

	protected deleteRequest<T>(endpoint: string, callBack: CallBackRequest<T>): void {
		const url = this.createURL(endpoint);
		this.http.delete<T>(url).subscribe(
			success => {
				if (callBack) callBack(true, success);
			},
			error => {
				const errorMessage =
					error.error?.message || 'Não foi possível conectar-se ao servidor. Tente novamente mais tarde';
				if (callBack) callBack(false, errorMessage);
			},
		);
	}

	protected putRequest<T>(endpoint: string, params: object, callBack: CallBackRequest<T>): void {
		const url = this.createURL(endpoint);
		this.http.put<T>(url, params).subscribe(
			success => {
				if (callBack) callBack(true, success);
			},
			error => {
				const errorMessage =
					error.error?.message || 'Não foi possível conectar-se ao servidor. Tente novamente mais tarde';
				if (callBack) callBack(false, errorMessage);
			},
		);
	}

	protected handleError(error: Response): Observable<never> {
		return throwError(error);
	}
}
