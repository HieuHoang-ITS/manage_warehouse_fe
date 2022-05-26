import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-add-new-order',
  templateUrl: './add-new-order.component.html',
  styleUrls: ['./add-new-order.component.scss'],
})
export class AddNewOrderComponent implements OnInit {
  productList: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.productList = response;
      console.log(this.productList);
    });
  }
}
