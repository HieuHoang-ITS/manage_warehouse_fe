import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/security/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchValue: string = '';
  title = 'Warehouse Management';
  products?: Product[];
  items: MenuItem[] = [];
  users: User[] = [];
  selectedUser: User = {} as any;

  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.items = [
      { icon: 'pi pi-github', routerLink: '/system/home' },
      {
        routerLinkActiveOptions: { exact: true },
        label: 'Statistics',
        routerLink: '/system/statistic',
        icon: 'pi pi-chart-line',
      },
      {
        label: 'Export/Import',
        icon: '',
        items: [
          {
            routerLinkActiveOptions: { exact: true },
            label: 'Import List',
            icon: 'pi pi-sign-in',
            style: '',
            routerLink: '/system/orders/import',
          },
          {
            routerLinkActiveOptions: { exact: true },
            label: 'Export List',
            icon: 'pi pi-sign-out',
            routerLink: '/system/orders/export',
          },
          {
            routerLinkActiveOptions: { exact: true },
            label: 'All Record',
            icon: 'pi pi-box',
            routerLink: '/system/orders/record',
          },
        ],
      },
      {
        label: 'Product Status',
        icon: '',
        items: [
          {
            routerLinkActiveOptions: { exact: true },
            label: 'Import Status',
            icon: 'pi pi-sign-in',
            routerLink: '/system/orderstatus/import/1',
          },
          {
            routerLinkActiveOptions: { exact: true },
            label: 'Export Status',
            icon: 'pi pi-sign-out',
            routerLink: '/system/orderstatus/export/2',
          },
        ],
      },
      {
        label: 'Systems',
        icon: '',
        items: [
          { label: 'Category', icon: 'pi pi-book', routerLink: '/system/category' },
          {
            label: 'Provider',
            icon: 'pi pi-building',
            routerLink: '/system/provider',
          },
          { label: 'User', icon: 'pi pi-user', routerLink: '/system/user' },
          { label: 'Product', icon: 'pi pi-home', routerLink: '/system/product' },
        ],
      },
    ];
  }

  signOut() {
    this.tokenService.signOut();
  }
}
