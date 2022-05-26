import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Category } from '../models/category';
@Injectable({
    providedIn: 'root'
})
export class CategorytService {
    categoryUrl: string = "http://localhost:8080/api/v1/Categories"
    constructor(private http: HttpClient) { }
    getAll(): Observable<any> {
        return this.http.get(this.categoryUrl).pipe();
    }

    save(name: string, status: string): Observable<any> {
        return this.http.post(this.categoryUrl + "/insert", JSON.stringify({ name: name, status: status }))
    }
}