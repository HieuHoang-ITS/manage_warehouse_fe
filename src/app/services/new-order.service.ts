import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import {
  newOrderSave,
  OrderDisplay,
  productDisplay,
} from '../models/order-display';
import { User } from '../models/user';

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
  productDisplay() {
    return this.http
      .get<productDisplay[]>(this.url + '/register/product')
      .pipe();
  }
  userDisplay() {
    return this.http.get<User[]>(this.url + '/register/user').pipe();
  }

  addNew(newOrderSave: newOrderSave) {
    return this.http
      .post<newOrderSave[]>(this.url + '/register/save', newOrderSave)
      .pipe();
  }
}
