import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { NewOrderService } from '../services/new-order.service';
import { Message } from 'primeng/api';
import { OrderDisplay } from '../models/order-display';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  // Define in-use variable
  orderList0?: OrderDisplay[];
  orderList?: OrderDisplay[];
  selectedQueue: Order[] = [];
  url: string = '';
  orderType: string = '';
  searchValue: string = '';
  selectedOrder: Order = {} as any;
  msg: Message[] = [];
  public modalDisplay: boolean = false;
  // Define filter variable
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
    private confirmationService: ConfirmationService,
    @Inject(DOCUMENT) private document: Document
  ) {
    // Get order type(export/import)
    this.url = this.document.location.href;
    this.orderType = this.url.split('/orders/')[1];
  }
  ngOnInit(): void {
    // Get all order records
    if (this.orderType.length > 0) {
      this.newOrderService.getNewOrders(this.orderType).subscribe((data) => {
        this.orderList0 = data;
        console.log(this.orderList0);
        this.orderList = this.orderList0;
      });
    }
  }
  // ==========================================
  // Filter-based search function
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

  // ==========================================
  // Select and delete functions
  selectOrder(order: Order) {
    this.selectedOrder = order;
  }
  onRowSelect($event: any) {
    console.log('selected id: ' + $event);
  }
  deleteConfirm() {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message:
        'You are going to clear all selected order records. Continue to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.deleteQueue(),
      reject: () => {},
    });
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

// Define filter interface
interface filterInterface {
  type: number;
  label: string;
}
