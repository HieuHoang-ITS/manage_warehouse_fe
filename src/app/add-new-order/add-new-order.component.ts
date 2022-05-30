import { Component, Inject, OnInit } from '@angular/core';
import { productDisplay } from '../models/order-display';
import { DetailListUpdate } from '../models/order-display';
import { newOrderSave } from '../models/order-display';
import { ProductService } from '../services/product.service';
import { NewOrderService } from '../services/new-order.service';
import { User } from '../models/user';
import { DOCUMENT } from '@angular/common';
import { Order } from '../models/order';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-new-order',
  templateUrl: './add-new-order.component.html',
  styleUrls: ['./add-new-order.component.scss'],
})
export class AddNewOrderComponent implements OnInit {
  // Define data field for order record
  pageUrl: string = '';
  orderType: string = '';
  totalPrice: number = 0;
  customerName: string = '';
  customerPhone: string = '';
  newOrderSave: newOrderSave = {} as any;
  createDate: Date = new Date();
  // Define lists to display
  productList: productDisplay[] = [];
  selectedProductList: productDisplay[] = [];
  draggedProduct: productDisplay = {} as any;
  userList: User[] = [];
  selectedUser: User = {} as any;
  amountInputIsEnable: boolean = true;
  amountStatus: boolean[] = [];

  constructor(
    private productService: ProductService,
    private newOrderService: NewOrderService,
    private messageService: MessageService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    // Read url and get type(export / import)
    this.pageUrl = this.document.location.href;
    this.orderType = this.pageUrl
      .split('/orders/')[1]
      .split('/register')[0]
      .toLowerCase();
  }

  ngOnInit(): void {
    // Get products list on initializing
    this.newOrderService.productDisplay().subscribe((response) => {
      this.productList = response;
      this.productList = this.arraySort(this.productList);
    });

    // Get users list on initializing
    this.newOrderService.userDisplay().subscribe((response) => {
      this.userList = response;
      console.log(this.userList);
    });
  }
  //=============================================
  // Sort Function
  arraySort(list: any[]): any[] {
    for (let i = 0; i < list.length; i++) list[i].order_amount = 0;
    list.sort((a, b) => (a.id > b.id ? 1 : -1));

    return list;
  }
  // ============================================
  // Drag Drop functions
  dragStart(product: productDisplay) {
    this.draggedProduct = product;
  }
  dragEnd() {
    this.draggedProduct = {} as any;
  }
  drop() {
    this.selectedProductList.push(this.draggedProduct);
    this.amountStatus.push(false);
    this.productList = this.productList.filter(
      (item) => item.id != this.draggedProduct.id
    );
  }
  popOut(index: number) {
    this.selectedProductList.splice(index, 1);
  }

  // ============================================
  // Function for saving new order record
  async saveFunction() {
    // Define order record
    if (
      this.selectedProductList.length > 0 &&
      this.customerName.length > 0 &&
      this.customerPhone.length > 0
    ) {
      let newOrder: Order = {
        trading_type: this.orderType,
        user_id: this.selectedUser.id,
        customer_name: this.customerName,
        customer_phone: this.customerPhone,
        status: '2',
        description: '',
        total_price: this.totalPrice,
        created_at: this.createDate,
      };
      // Define detail list records
      let newDetailList: DetailListUpdate[] = [];
      this.selectedProductList.forEach((item) => {
        newDetailList.push({
          product_id: item.id,
          order_id: '',
          amount: item.order_amount,
        });
      });
      // post to backend through service
      this.newOrderSave = {
        order: newOrder,
        details: newDetailList!,
      };
      console.log(this.newOrderSave);
      this.newOrderService.addNew(this.newOrderSave);
      this.messageService.add({
        severity: 'success',
        summary: 'Congratulation',
        detail: 'New Order Registered',
      });
      // setTimeout(this.routingBack, 3000);
      await this.delay(3000);
      this.routingBack;
    } else {
      if (this.selectedProductList.length < 1)
        this.messageService.add({
          severity: 'error',
          summary: 'Warning',
          detail: 'You have not yet chosen any product',
        });
      if (this.customerName.length < 1)
        this.messageService.add({
          severity: 'error',
          summary: 'Warning',
          detail: 'Customer Name is required',
        });
      if (this.customerPhone.length < 1)
        this.messageService.add({
          severity: 'error',
          summary: 'Warning',
          detail: 'Customer phone is required',
        });
    }
  }
  //delay function
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //route back to records view
  routingBack() {
    this.router.navigate(['/orders/' + this.orderType.toLowerCase()]);
  }

  // ============================================
  //Clear products-selected detail records
  clearFunction() {
    this.productList = this.productList.concat(this.selectedProductList);
    this.productList = this.arraySort(this.productList);
    this.selectedProductList = [];
  }

  // ============================================
  // Function for updating order.totalprice based on inputted detail.order_amount of detail records
  // In export order, check if desired amount <= actual goods amount in warehouse
  checkAmount(index: number): boolean {
    if (this.orderType.match('export')) {
      if (
        this.selectedProductList[index].order_amount >
        this.selectedProductList[index].amount
      ) {
        this.selectedProductList[index].order_amount =
          this.selectedProductList[index].amount;
        this.amountStatus[index] = true;
      }
    }
    return false;
  }
  // Update total price each time a new order value is inputted
  updateTotalPrice() {
    this.totalPrice = 0;
    this.selectedProductList.forEach((item) => {
      this.totalPrice += item.price * item.order_amount;
    });
  }
}
