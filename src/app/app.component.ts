import { Component } from '@angular/core';
import { Product } from './models/product';
import { ProductService } from './services/product.service';
import { MenuItem } from 'primeng/api';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private productService: ProductService) {}
  ngOnInit() {
    
  }
}

// getProducts(): void {
//   this.productService
//     .getProducts()
//     .subscribe((data) => (this.products = data));
// }
