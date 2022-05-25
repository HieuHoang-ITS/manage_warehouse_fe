import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class NewOrderService {
  url = 'http://localhost:4200';
  constructor(private http: HttpClient) {}

  getNewOrders() {
    return this.http.get('url' + '/orders');
  }
}
