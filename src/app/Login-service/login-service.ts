import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../request-services/request-service';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = 'Auth/login'; 
  
    constructor(private _dataService: DataService) {}
  
    login(username: string, hashedPassword: string): Observable<{ token: string }> {
      return this._dataService.postData(this.apiUrl, {
        username: username,
        password: hashedPassword
      });
    }
  
    storeToken(token: string): void {
      localStorage.setItem('token', token);
    }
  
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    isLoggedIn(): boolean {
      return this.getToken() !== null;
    }
  }