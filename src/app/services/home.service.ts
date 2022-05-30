import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDisplay } from '../models/order-display';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  url: string = 'http://localhost:8080/api/home';
  constructor(private http: HttpClient) {}
  getOrders() {
    return this.http.get<OrderDisplay[]>(this.url).pipe();
  }
  getTotals() {
    return this.http.get<homeDisplay>(this.url + '/total').pipe();
  }
}

interface homeDisplay {
  totalOrders: number;
  totalProducts: number;
  totalCategories: number;
  totalProviders: number;
}
