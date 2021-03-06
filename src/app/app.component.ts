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
  searchValue: string = '';
  title = 'Warehouse Management';
  products?: Product[];
  items: MenuItem[] = [];
  users: User[] = [];
  selectedUser: User = {} as any;
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.items = [
      { icon: 'pi pi-github', routerLink: 'home' },
      {
        label: 'Statistics',
        routerLink: '/statistic',
        icon: 'pi pi-chart-line',
        // items: [
        //   {
        //     label: 'New',
        //     icon: 'pi pi-fw pi-plus',
        //     items: [{ label: 'Project' }, { label: 'Other' }],
        //   },
        //   { label: 'Open' },
        //   { label: 'Quit' },
        // ],
      },
      {
        label: 'Export/Import',
        icon: '',
        items: [
          {
            label: 'Import List',
            icon: 'pi pi-sign-in',
            style: '',
            routerLink: 'orders/import',
          },
          {
            label: 'Export List',
            icon: 'pi pi-sign-out',
            routerLink: 'orders/export',
          },
          {
            label: 'All Record',
            icon: 'pi pi-box',
            routerLink: 'orders/record',
          },
        ],
      },
      {
        label: 'Product Status',
        icon: '',
        items: [
          {
            label: 'Import Status',
            icon: 'pi pi-sign-in',
            routerLink: 'orderstatus/import/1',
          },
          {
            label: 'Export Status',
            icon: 'pi pi-sign-out',
            routerLink: 'orderstatus/export/2',
          },
        ],
      },
      {
        label: 'Systems',
        icon: '',
        items: [
          { label: 'Category', icon: 'pi pi-book', routerLink: '/category' },
          {
            label: 'Provider',
            icon: 'pi pi-building',
            routerLink: '/provider',
          },
          { label: 'User', icon: 'pi pi-user', routerLink: '/user' },
          { label: 'Product', icon: 'pi pi-home', routerLink: '/product' },
        ],
      },
    ];
  }
}

// getProducts(): void {
//   this.productService
//     .getProducts()
//     .subscribe((data) => (this.products = data));
// }
