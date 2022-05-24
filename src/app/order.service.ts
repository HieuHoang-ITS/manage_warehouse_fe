import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private orderUrl = 'http://localhost:8080/api/orderchoxacnhan';
  constructor(private http: HttpClient) { }
  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.productUrl).pipe();
  // }
  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.orderUrl).pipe();
  }
}
