import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { OrderDisplay } from '../models/order-display';

@Injectable({
  providedIn: 'root',
})
export class NewOrderService {
  orderType: String = '';
  url = 'http://localhost:8080/api/orders';
  orderList: Order[] = [];
  constructor(private http: HttpClient) {}

  typeOrder(type: string) {
    this.orderType = type;
  }
  getNewOrders(type: string) {
    console.log(type);
    return this.http.get<OrderDisplay[]>(this.url + '/' + type).pipe();
  }
}
