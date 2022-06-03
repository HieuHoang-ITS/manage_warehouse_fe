import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Order } from '../models/order';
import { NewOrderService } from '../services/new-order.service';
import { Message } from 'primeng/api';
import { Filters, OrderDisplay } from '../models/order-display';
import { ConfirmationService } from 'primeng/api';
import { AddNewOrderComponent } from '../add-new-order/add-new-order.component';
import { MessageService } from 'primeng/api';
import { User } from '../models/user';
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
  selectedOrder: Order = {} as any;
  msg: Message[] = [];
  modalDetailDisplay: boolean = false;
  modalRegDisplay: boolean = false;
  isbuttonInRecord: boolean = false;

  // Define filter variable
  searchID: string = '';
  users: User[] = [];

  selectedUser?: User;
  selectedStatus: statusDisplay = {} as any;
  status: statusDisplay[] = [
    { type: 1, label: 'Thành Công' },
    { type: 2, label: 'Chờ Xác Nhận' },
    { type: 3, label: 'Hủy' },
  ];
  dateValue?: Date;

  @ViewChild(AddNewOrderComponent)
  private addNewOrder!: AddNewOrderComponent;
  // Constructer
  constructor(
    private messageService: MessageService,
    private newOrderService: NewOrderService,
    private confirmationService: ConfirmationService,
    @Inject(DOCUMENT) private document: Document
  ) {
    // Get order type(export/import)
    this.url = this.document.location.href;
    this.orderType = this.url.split('/orders/')[1];
  }
  ngOnInit(): void {
    this.getAllOrders();
    this.getAllUsers();
  }
  // ==========================================
  // Get table records
  getAllOrders() {
    if (this.orderType.length > 0) {
      this.newOrderService.getNewOrders(this.orderType).subscribe((data) => {
        this.orderList = data;
        this.orderList = this.orderList.sort((a, b) => (a.id > b.id ? 1 : -1));
        this.orderList.forEach((item) => {
          if (item.status.includes('1')) item.status = 'Thành Công';
          if (item.status.includes('2')) item.status = 'Chờ Xác Nhận';
          if (item.status.includes('3')) item.status = 'Hủy';
        });
        console.log('Order Display: ' + this.orderList);
      });
    }
    if (this.orderType.toLowerCase().includes('record'))
      this.isbuttonInRecord = true;
  }
  getAllUsers() {
    this.newOrderService.userDisplay().subscribe((response) => {
      this.users = response;
    });
  }
  // ==========================================
  // Filter-based search function
  search() {
    let id;
    let uid;
    let status;
    let date;
    if (this.searchID) id = this.searchID;
    else id = '';
    if (this.selectedUser) uid = this.selectedUser.id;
    else uid = '';
    if (this.selectedStatus) status = String(this.selectedStatus.type);
    else status = '';
    if (this.dateValue) {
      let year = String(this.dateValue.getFullYear());
      let month = String(this.dateValue.getMonth() + 1);
      let day = String(this.dateValue.getDate());
      date = year + '-' + month + '-' + day;
    } else date = '';
    let filters = {
      id: id,
      username: uid,
      status: status,
      date: date,
    };
    console.log('Filter: ' + filters);
    this.newOrderService
      .searchByFilter(filters, this.orderType)
      .subscribe((response) => {
        this.orderList = response;
        this.orderList = this.orderList.sort((a, b) => (a.id > b.id ? 1 : -1));
        console.log(this.orderList);
        this.orderList.forEach((item) => {
          if (item.status.includes('1')) item.status = 'Thành Công';
          if (item.status.includes('2')) item.status = 'Chờ Xác Nhận';
          if (item.status.includes('3')) item.status = 'Hủy';
        });
      });
  }
  // Refresh the selected filters
  refreshFilter() {
    this.selectedUser = {} as any;
    this.selectedStatus = {} as any;
    this.dateValue = undefined;
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
    console.log('Selected Orders: ' + this.selectedQueue);
    let deleteIDs: number[] = [];
    this.selectedQueue.forEach((element) => {
      if (element.status.toLowerCase().includes('chờ'))
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail:
            'Order ID: ' +
            element.id +
            ' - Pending order is not allowed to delete!',
        });
      else {
        this.orderList = this.orderList?.filter((item) => item != element);
        deleteIDs.push(element.id);
      }
    });
    if (deleteIDs.length > 0) this.newOrderService.deleteDisplayList(deleteIDs);
    this.selectedQueue = [];
  }
  clearFunction() {
    this.addNewOrder.clearFunction();
    // delay
  }
  public delay(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
  // ==========================================
  //Save Function
  saveFunction() {
    let status = this.addNewOrder.saveFunction();
    if (status) {
      this.modalRegDisplay = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Congratulation',
        detail: 'New Order Registered',
      });
      setTimeout(() => {
        this.getAllOrders();
      }, 500);
    }
  }
}
interface statusDisplay {
  type: number;
  label: string;
}
