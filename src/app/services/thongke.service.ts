import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ThongKe } from '../models/thongke';
import { pieChart } from '../models/thongke';
import {doughChart} from '../models/thongke';
// import { ThongKe } from '../models/Thongke';
@Injectable({
  providedIn: 'root'
})
export class ThongkeService {
  thongkeUrl="http://localhost:8080/thang1"
  pieChartUrl="http://localhost:8080/api/thongkeloaixuat/"
  piechartUrlnhap ="http://localhost:8080/api/thongkeloainhap/"
  doughnutChartxuat ="http://localhost:8080/api/thongkeloaixuat/"
  doughnutChartnhap  = "http://localhost:8080/api/thongkeloainhap/"
  constructor(private httpclient: HttpClient) { }
  getDoanhThuTheoThang() : Observable<ThongKe[]>
  {
    return this.httpclient.get<ThongKe[]>(this.thongkeUrl).pipe();
  }
  getExportPerc(month: number, year: number) {
    return this.httpclient.get<pieChart[]>(this.pieChartUrl+month+'/'+year)
  }
  getImportPerc(month: number, year: number) {
    return this.httpclient.get<pieChart[]>(this.piechartUrlnhap+month+'/'+year)
  }
  getExportDouc(month: number, year: number) {
    return this.httpclient.get<doughChart[]>(this.doughnutChartxuat+month+'/'+year)
  }
  getImportDouc(month: number, year: number) {
    return this.httpclient.get<doughChart[]>(this.doughnutChartnhap+month+'/'+year)
  }
}