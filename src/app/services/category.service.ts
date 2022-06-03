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
        return this.http.post(this.categoryUrl + "/insert", data)
    }
    delete(id: number): Observable<any> {
        let deleteUrl = this.categoryUrl + "/delete/" + id;
        console.log(deleteUrl);
        return this.http.delete(deleteUrl);
    }
    update(data: Category, id: any): Observable<any> {
        let updateUrl = this.categoryUrl + "/update/" + id;
        console.log(data);
        return this.http.put(updateUrl, data).pipe();
    }
}