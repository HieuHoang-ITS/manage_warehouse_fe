import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Category } from '../models/category';
import { User } from '../models/user';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    userUrl: string = "http://localhost:8080/api/v1/User"
    constructor(private http: HttpClient) { }
    getAll(): Observable<any> {
        return this.http.get(this.userUrl).pipe();
    }

    save(data: any): Observable<any> {
        return this.http.post(this.userUrl + "/insert", data)
    }
    delete(id: number): Observable<any> {
        let deleteUrl = this.userUrl + "/delete/" + id;
        console.log(deleteUrl);
        return this.http.delete(deleteUrl);
    }
    update(data: User, id: any): Observable<any> {
        let updateUrl = this.userUrl + "/update/" + id;
        console.log(data);
        return this.http.put(updateUrl, data).pipe();
    }
    search(name: String, email: String, tel: String): Observable<any> {

        let searchUrl = this.userUrl + "/search" + "?full_name=" + name + "&email=" + email + "&tel=" + tel

        console.log(searchUrl)
        return this.http.get<Category>(searchUrl)
    }
}