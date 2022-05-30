import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Order } from '../models/order';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = 'http://localhost:8080/api/orderchoxacnhan/';
  private orderUpdateUrl='http://localhost:8080/api/updateorder/'
  private orderDetailUrl='http://localhost:8080/api/tabledetail/';
  private orderSearchUrl="http://localhost:8080/api/search/";
  private userUrl="http://localhost:8080/api/getuser";
  constructor(private http: HttpClient) { }
  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.productUrl).pipe();
  // }
  getOrders(type: any): Observable<Order[]>{
    console.log('Check Order: ')
    return this.http.get<Order[]>(this.orderUrl+type).pipe();
  }
  getOrderDetail(id: any): Observable<any[]>{
    return this.http.get<any[]>(this.orderDetailUrl+id).pipe();
  }
  updateOrder(id: any, order: Order): Observable<Order>{
    return this.http.put<Order>(this.orderUpdateUrl+id, order)
  }
  // /2/1/?ngay=1/1/19&loai=export
  searchOrder(id_order: number, id_user: number, ngay: string, loai: string): Observable<Order[]>
  {
    return this.http.get<Order[]>(this.orderSearchUrl+
      id_order+'/'+id_user+"/?ngay="+ ngay+"&loai="+loai)
  }
  searchOrde(id_order: number, id_user: number, ngay: string, loai: string): Observable<Order[]>
  {
    return this.http.get<Order[]>('${this.orderSearchUrl}/${id_order}/${id_user}/?ngay=${ngay}&loai=${loai}')
  }
  getUsers(): Observable<User[]>
  {
    return this.http.get<User[]>(this.userUrl).pipe();
  }
}
