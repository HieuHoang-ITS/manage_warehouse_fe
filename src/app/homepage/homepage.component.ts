import { Component, OnInit } from '@angular/core';
import { OrderDisplay } from '../models/order-display';
import { HomeService } from '../services/home.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  orderList: OrderDisplay[] = [];
  homeDisplay: {
    totalOrders: number;
    totalProducts: number;
    totalCategories: number;
    totalProviders: number;
  } = {} as any;
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getOrders().subscribe((data) => {
      this.orderList = data;
    });
    this.homeService.getTotals().subscribe((data) => {
      this.homeDisplay = data;
      console.log(this.homeDisplay);
    });
  }
}
