import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { DetailOrder } from '../models/detail-order';
import { DetailOrderService } from '../services/detail-order.service';
@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss'],
})
export class DetailOrderComponent implements OnInit {
  @Input() parentOrder?: Order;
  detailOrderList: DetailOrder[] = [];
  constructor(private detailOrderService: DetailOrderService) {}

  ngOnInit(): void {
    this.detailOrderService
      .getDetailOrders(this.parentOrder!.id)
      .subscribe((response) => {
        this.detailOrderList = response;
        console.log(this.detailOrderList);
      });
  }
}
