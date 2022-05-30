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

    save(data: any): Observable<any> {
        return this.http.post('this.categoryUrl' + "/insert", data)
    }
    delete(id: number): Observable<any> {
        return this.http.delete(this.categoryUrl + "/${id}");
    }
    update(id: any, data: any) {
        return this.http.put(this.categoryUrl + "/{id}", data)
    }
}