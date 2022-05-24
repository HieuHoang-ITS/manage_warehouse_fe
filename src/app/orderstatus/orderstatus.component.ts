import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { Order } from '../models/order';
import { OrderService } from '../order.service';
@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss']
})
export class OrderstatusComponent implements OnInit {
  orders?: Order[];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrder()
  }
  getOrder() : void{
    this.orderService.getOrders().subscribe(data=> this.orders=data);
  }
}
