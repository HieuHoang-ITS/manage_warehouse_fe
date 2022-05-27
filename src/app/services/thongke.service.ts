import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ThongKe } from '../models/ThongKe';
@Injectable({
  providedIn: 'root'
})
export class ThongkeService {
  thongkeUrl="http://localhost:8080/thang1"
  constructor(private httpclient: HttpClient) { }
  getDoanhThuTheoThang() : Observable<ThongKe[]>
  {
    return this.httpclient.get<ThongKe[]>(this.thongkeUrl).pipe();
  }
}
