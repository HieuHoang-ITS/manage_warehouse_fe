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
  // Get all order records
  getNewOrders(type: string) {
    console.log(type);
    return this.http.get<OrderDisplay[]>(this.url + '/' + type).pipe();
  }
  // Get formatted-products-to-display format list
  productDisplay() {
    return this.http
      .get<productDisplay[]>(this.url + '/register/product')
      .pipe();
  }
  // Get users list
  userDisplay() {
    return this.http.get<User[]>(this.url + '/register/user').pipe();
  }
  // Post new order record
  addNew(newOrderSave: newOrderSave) {
    this.http
      .post<newOrderSave[]>(this.url + '/register/save', newOrderSave)
      .subscribe((response) => console.log(response));
  }
}
