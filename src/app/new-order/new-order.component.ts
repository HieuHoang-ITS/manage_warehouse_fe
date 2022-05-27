import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { NewOrderService } from '../services/new-order.service';
import { Message } from 'primeng/api';
import { OrderDisplay } from '../models/order-display';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  // Define var
  orderList0?: OrderDisplay[];
  orderList?: OrderDisplay[];
  selectedQueue: Order[] = [];
  url: string = '';
  orderType: string = '';
  searchValue: string = '';
  selectedOrder: Order = {} as any;
  msg: Message[] = [];
  public modalDisplay: boolean = false;

  selectedFilter: filterInterface = {} as any;
  filters: filterInterface[] = [
    { type: 1, label: 'Mã đơn hàng' },
    { type: 2, label: 'Tên khách hàng' },
    { type: 3, label: 'Trạng thái' },
    { type: 4, label: 'Người phụ trách' },
  ];
  // Constructer
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
        this.orderList0 = data;
        console.log(this.orderList0);
        for (let i = 0; i < this.orderList0.length; i++) {
          if (this.orderList0[i].status.trim() === '1') {
            this.orderList0[i].status = 'Chấp thuận';
          } else if (this.orderList0[i].status.trim() === '2') {
            this.orderList0[i].status = 'Đang chờ xử lí';
          } else if (this.orderList0[i].status.trim() === '3') {
            this.orderList0[i].status = 'Hủy bỏ';
          } else {
          }
        }
        this.orderList = this.orderList0;
      });
    }
  }
  search() {
    console.log(this.selectedFilter.type);
    if (this.searchValue.length < 1) {
      this.orderList = this.orderList0;
    } else {
      switch (this.selectedFilter.type) {
        case 1:
          this.orderList = this.orderList0?.filter(
            (item) => item.id == this.searchValue
          );
          break;
        case 2:
          this.orderList = this.orderList0?.filter((item) =>
            item.customer_name
              .toUpperCase()
              .includes(this.searchValue.toUpperCase())
          );
          break;
        case 3:
          this.orderList = this.orderList0?.filter((item) =>
            item.status.toUpperCase().includes(this.searchValue.toUpperCase())
          );
          break;
        case 4:
          this.orderList = this.orderList0?.filter((item) =>
            item.user_name
              .toUpperCase()
              .includes(this.searchValue.toUpperCase())
          );

          break;
      }
    }
  }
  selectOrder(order: Order) {
    this.selectedOrder = order;
  }
  onRowSelect($event: any) {
    console.log('selected id: ' + $event);
  }
  deleteQueue() {
    this.msg = [];
    console.log(this.selectedQueue);
    this.selectedQueue.forEach((element) => {
      if (element.status.toLowerCase().includes('chờ'))
        this.msg.push({
          severity: 'warn',
          summary: 'Warning',
          detail:
            'Order ID: ' +
            element.id +
            ' - Pending order is not allowed to delete!',
        });
      else {
        this.orderList = this.orderList?.filter((item) => item != element);
      }
    });
    this.selectedQueue = [];
  }
}
interface filterInterface {
  type: number;
  label: string;
}
