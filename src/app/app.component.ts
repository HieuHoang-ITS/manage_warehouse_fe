import { Component } from '@angular/core';
import { Product } from './models/product';
import { NewOrderService } from './services/new-order.service';
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
  constructor(private newOrderService: NewOrderService) {}

  ngOnInit() {
    this.items = [
      { icon: 'pi pi-github', routerLink: '/home' },
      {
        label: 'Statistics',
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
        routerLink: 'orders',
        items: [
          {
            label: 'Export List',
            icon: 'pi pi-sign-in',
            routerLink: 'orders/export',
          },
          {
            label: 'Import List',
            icon: 'pi pi-sign-out',
            routerLink: 'orders/import',
          },
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
          { label: 'Category', icon: 'pi pi-book' },
          { label: 'Provider', icon: 'pi pi-building' },
          { label: 'Price', icon: 'pi pi-dollar' },
        ],
      },
    ];
  }
}
