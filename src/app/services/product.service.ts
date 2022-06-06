import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { productDisplay } from '../models/order-display';
import { Category } from '../models/category';
import { Provider } from '../models/provider';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productUrl: string = "http://localhost:8080/api/v1/Products"
  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http
      .get<productDisplay[]>(this.productUrl)
      .pipe();
  }

  save(data: any): Observable<any> {
    return this.http.post(this.productUrl + "/insert", data)
  }
  delete(id: number): Observable<any> {
    let deleteUrl = this.productUrl + "/delete/" + id;
    console.log(deleteUrl);
    return this.http.delete(deleteUrl);
  }
  update(data: Product, id: any): Observable<any> {
    let updateUrl = this.productUrl + "/update/" + id;
    console.log(data);
    return this.http.put(updateUrl, data).pipe();
  }
  search(tenhanghoa: String, loaihanghoa: String, nhacungcap: String): Observable<any> {

    let searchUrl = this.productUrl + "/search" + "?product_name=" + tenhanghoa + "&category_name=" + loaihanghoa + "&provider_name=" + nhacungcap

    console.log(searchUrl)
    return this.http.get<productDisplay>(searchUrl)
  }
  getAllCategory(): Observable<any> {
    let getURLca = 'http://localhost:8080/api/v1/Categories'
    return this.http.get<Category>(getURLca).pipe()
  }
  getAllProvider(): Observable<any> {
    let getURLpr = 'http://localhost:8080/api/v1/Providers'
    return this.http.get<Provider>(getURLpr).pipe()
  }
}
