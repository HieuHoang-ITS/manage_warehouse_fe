import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailOrder } from '../models/detail-order';
import { DetailOrderDisplay } from '../models/detail-order-display';
@Injectable({
  providedIn: 'root',
})
export class DetailOrderService {
  url = 'http://localhost:8080/api/orders';
  constructor(private http: HttpClient) {}

  getDetailOrders(id: number) {
    return this.http
      .get<DetailOrderDisplay[]>(this.url + '/detail/' + id)
      .pipe();
  }
}
