import { Component, Inject, OnInit } from '@angular/core';
import { productDisplay } from '../models/order-display';
import { newOrderSave } from '../models/order-display';
import { ProductService } from '../services/product.service';
import { NewOrderService } from '../services/new-order.service';
import { User } from '../models/user';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-add-new-order',
  templateUrl: './add-new-order.component.html',
  styleUrls: ['./add-new-order.component.scss'],
})
export class AddNewOrderComponent implements OnInit {
  //
  pageUrl: string = '';
  orderType: string = '';
  totalPrice: number = 0;
  customerName: string = '';
  customerPhone: string = '';
  newOrderSave: newOrderSave = {} as any;
  //
  productList: productDisplay[] = [];
  selectedProductList: productDisplay[] = [];
  draggedProduct: productDisplay = {} as any;
  userList: User[] = [];
  selectedUser: User = {} as any;

  constructor(
    private productService: ProductService,
    private newOrderService: NewOrderService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.pageUrl = this.document.location.href;
    this.orderType = this.pageUrl
      .split('/orders/')[1]
      .split('/register')[0]
      .toUpperCase();
  }

  ngOnInit(): void {
    this.newOrderService.productDisplay().subscribe((response) => {
      this.productList = response;
      for (let i = 0; i < this.productList.length; i++)
        this.productList[i].order_amount = 0;
      this.productList.sort((a, b) => (a.id > b.id ? 1 : -1));
    });
    this.newOrderService.userDisplay().subscribe((response) => {
      this.userList = response;
      console.log(this.userList);
    });
  }

  dragStart(product: productDisplay) {
    this.draggedProduct = product;
  }
  dragEnd() {
    this.draggedProduct = {} as any;
  }
  drop() {
    this.selectedProductList.push(this.draggedProduct);
    this.productList = this.productList.filter(
      (item) => item.id != this.draggedProduct.id
    );
  }
  saveFunction() {
    this.newOrderSave = {
      trading_type: this.orderType,
      customer_name: this.customerName,
      customer_phone: this.customerPhone,
      status: 'Chờ xác nhận',
      total_price: this.totalPrice,
      created_at: new Date(),
      products: this.selectedProductList,
    };
  }
  clearFunction() {
    this.selectedProductList = [];
  }
  updateTotalPrice() {
    this.totalPrice = 0;
    this.selectedProductList.forEach((item) => {
      this.totalPrice += item.price * item.order_amount;
    });
  }
}
