import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import {
  Filters,
  newOrderSave,
  OrderDisplay,
  productDisplay,
} from '../models/order-display';
import { User } from '../models/user';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
    return this.http.get<OrderDisplay[]>(this.url + '/' + type, environment.httpOptions).pipe();
  }
  // Get formatted-products-to-display format list
  productDisplay(type: string) {
    return this.http
      .get<productDisplay[]>(this.url + '/register/product?type=' + type, environment.httpOptions)
      .pipe();
  }
  // Get users list
  userDisplay() {
    return this.http.get<User[]>(this.url + '/register/user').pipe();
  }
  // Post new order record
  addNew(newOrderSave: newOrderSave) {
    this.http
      .post<newOrderSave[]>(this.url + '/register/save', newOrderSave, environment.httpOptions)
      .subscribe((response) => {
      });
  }
  //Put delete_flag
  deleteDisplayList(deleteIDs: number[]) {
    this.http
      .put<number[]>(this.url + '/change-delete-flag', deleteIDs, environment.httpOptions)
      .pipe()
      .subscribe((response) => {
      });
  }
  //Get search by filter
  searchByFilter(filters: Filters, type: string) {
    let searchUrl = this.url + '/search?';
    let requestParams =
      'id=' +
      filters.id +
      '&uid=' +
      filters.username +
      '&status=' +
      filters.status +
      '&fromDate=' +
      filters.fromDate +
      '&toDate=' +
      filters.toDate +
      '&type=' +
      type;
    return this.http.get<OrderDisplay[]>(searchUrl + requestParams, environment.httpOptions).pipe();
  }
}
