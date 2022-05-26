import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { NewOrderService } from '../services/new-order.service';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  orderList?: Order[];
  url: string = '';
  orderType: string = '';
  searchValue: string = '';
  selectedOrder: Order = {} as any;
  public modalDisplay: boolean = false;
  constructor(
    private newOrderService: NewOrderService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.url = this.document.location.href;
    this.orderType = this.url.split('/orders/')[1];
  }

  ngOnInit(): void {
    if (this.orderType.length > 0) {
      this.newOrderService.getNewOrders(this.orderType).subscribe((data) => {
        this.orderList = data;
      });
    }
  }
  selectOrder(order: Order) {
    this.selectedOrder = order;
  }
}
