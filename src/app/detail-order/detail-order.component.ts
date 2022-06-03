import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { DetailOrder } from '../models/detail-order';
import { DetailOrderService } from '../services/detail-order.service';
import { DetailOrderDisplay } from '../models/order-display';
@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss'],
})
export class DetailOrderComponent implements OnInit {
  @Input() parentOrder?: Order;
  dOrderDisplayList: DetailOrderDisplay[] = [];
  lockedOrder: DetailOrderDisplay[] = [];
  constructor(private detailOrderService: DetailOrderService) {}
  ngOnInit(): void {
    // Get detail list based on selected-order id
    this.detailOrderService
      .getDetailOrders(this.parentOrder!.id)
      .subscribe((response) => {
        this.dOrderDisplayList = response;
        console.log(this.dOrderDisplayList);
      });
  }
  // Function for locking and unlocking a single record
  lockOrder(order: DetailOrderDisplay, frozen: boolean, index: number) {
    if (frozen) {
      this.dOrderDisplayList = this.dOrderDisplayList.filter(
        (c, i) => i !== index
      );
      this.lockedOrder.push(order);
    } else {
      this.lockedOrder = this.lockedOrder.filter((c, i) => i !== index);
      this.dOrderDisplayList.push(order);
    }
  }
}
