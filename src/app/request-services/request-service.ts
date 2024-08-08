import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HastaData, PaginatedResult } from '../hasta-data/hasta-data';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const baseUrl = "http://localhost:5199/api/";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    
    constructor(private _httpClient: HttpClient, private router: Router) {}

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });

        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 401) {
            // 401 hatası durumunda giriş sayfasına yönlendirme
            localStorage.removeItem('token'); // Token'ı temizle
            this.router.navigate(['/log-in']); // Giriş sayfasına yönlendir
        }
        return throwError(() => error); // Hataları yeniden fırlat
    }

    getData(url: string): Observable<any> {
        url = baseUrl + url;
        return this._httpClient.get(url, {
            headers: this.getHeaders()
        }).pipe(
            catchError(error => this.handleError(error))
        );
    }

    getDatas(url: string): Observable<PaginatedResult<HastaData>> {
        const baseUrl = 'http://localhost:5199/api/';
        url = baseUrl + url;
        return this._httpClient.get<PaginatedResult<HastaData>>(url, {
            headers: this.getHeaders()
        }).pipe(
            catchError(error => this.handleError(error))
        );
    }

    postData(url: string, data: any): Observable<any> {
        url = baseUrl + url;
        return this._httpClient.post(url, data, {
            headers: this.getHeaders()
        }).pipe(
            catchError(error => this.handleError(error))
        );
    }

    putData(url: string, data: any): Observable<any> {
        url = baseUrl + url;
        return this._httpClient.put(url, data, {
            headers: this.getHeaders()
        }).pipe(
            catchError(error => this.handleError(error))
        );
    }
}
