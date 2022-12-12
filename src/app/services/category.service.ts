import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class CategorytService {
    categoryUrl: string = "http://localhost:8080/api/v1/Categories"
    constructor(private http: HttpClient) { }
    getAll(): Observable<any> {
        return this.http.get(this.categoryUrl, environment.httpOptions).pipe();
    }

    save(data: any): Observable<any> {
        return this.http.post(this.categoryUrl + "/insert", data, environment.httpOptions)
    }
    delete(id: number): Observable<any> {
        let deleteUrl = this.categoryUrl + "/delete/" + id;
        return this.http.delete(deleteUrl, environment.httpOptions);
    }
    update(data: Category, id: any): Observable<any> {
        let updateUrl = this.categoryUrl + "/update/" + id;
        return this.http.put(updateUrl, data, environment.httpOptions).pipe();
    }
    search(name: String): Observable<any> {
        let searchUrl = this.categoryUrl + "/search/" + name
        return this.http.get<Category>(searchUrl, environment.httpOptions)
    }
}