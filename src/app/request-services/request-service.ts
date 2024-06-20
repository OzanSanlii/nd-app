import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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

    putData(url: string, data: any) {
        url = baseUrl + url;
        return this._httpClient.put(url, data, {});
}}