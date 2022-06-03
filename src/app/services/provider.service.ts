import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Provider } from '../models/provider';
@Injectable({
    providedIn: 'root'
})
export class ProvidertService {
    providerUrl: string = "http://localhost:8080/api/v1/Providers"
    constructor(private http: HttpClient) { }
    getAll(): Observable<any> {
        return this.http.get(this.providerUrl).pipe();
    }

    save(data: any): Observable<any> {
        return this.http.post(this.providerUrl + "/insert", data)
    }
    delete(id: number): Observable<any> {
        let deleteUrl = this.providerUrl + "/delete/" + id;
        console.log(deleteUrl);
        return this.http.delete(deleteUrl);
    }
    update(data: Provider, id: any): Observable<any> {
        let updateUrl = this.providerUrl + "/update/" + id;
        console.log(data);
        return this.http.put(updateUrl, data).pipe();
    }
    search(address: String, tel: String): Observable<any> {

        let searchUrl = this.providerUrl + "/search" + "?address=" + address + "&tel=" + tel

        console.log(searchUrl)
        return this.http.get<Provider>(searchUrl)
    }
}