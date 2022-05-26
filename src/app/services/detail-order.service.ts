import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetailOrder } from '../models/detail-order';
@Injectable({
  providedIn: 'root',
})
export class DetailOrderService {
  url = 'http://localhost:8080/api/orders';
  constructor(private http: HttpClient) {}

  getDetailOrders(id: number) {
    return this.http.get<DetailOrder[]>(this.url + '/detail/' + id).pipe();
  }
}
