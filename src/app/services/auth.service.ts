import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../dto/auth/login';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authUrl = 'http://localhost:8080/api/v1/auth/';

    constructor(private http: HttpClient) { }
    login(loginRequest: LoginRequest): Observable<any> {
        return this.http.post(this.authUrl + 'login',
            loginRequest
            , environment.httpOptions);
    }

    logout(strToken: any): Observable<any> {
        let token: any = {};
        token['token'] = strToken;        
        return this.http.post(this.authUrl + 'logout', token, environment.httpOptions);
    }
}