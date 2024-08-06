import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HastaData, PaginatedResult } from '../hasta-data/hasta-data';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:5199/api/";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    
    constructor(private _httpClient: HttpClient) {
        
    }

    getData(url: string) {
        url = baseUrl + url;
        return this._httpClient.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    getDatas(url: string): Observable<PaginatedResult<HastaData>> {
        const baseUrl = 'http://localhost:5199/api/';  // API base URL'nizi buraya ekleyin
        url = baseUrl + url;
        return this._httpClient.get<PaginatedResult<HastaData>>(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }
    

    putData(url: string, data: any) {
        url = baseUrl + url;
        return this._httpClient.put(url, data);
}}