import { Component } from '@angular/core';
import { Product } from './models/product';
import { ProductService } from './services/product.service';
import { MenuItem } from 'primeng/api';
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

  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.items = [
      { icon: 'pi pi-github', routerLink: 'home' },
      {
        label: 'Statistics',
        routerLink: "/statistic",
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
          { label: 'Export List', icon: 'pi pi-sign-in' },
          { label: 'Import List', icon: 'pi pi-sign-out', style: '' },
        ],
      },
      {
        label: 'Product Status',
        icon: '',
        items: [
          { label: 'Import Status', icon: 'pi pi-sign-in' },
          { label: 'Export Status', icon: 'pi pi-sign-out' },
        ],
      },
      {
        label: 'Systems',
        icon: '',
        items: [
          { label: 'Category', icon: 'pi pi-book', routerLink: "/category" },
          { label: 'Provider', icon: 'pi pi-building' },
          { label: 'User', icon: 'pi pi-user' },
          { label: 'Product', icon: 'pi pi-home', routerLink: "/product" },
        ],
      },
    ];
  }

}