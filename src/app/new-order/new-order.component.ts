import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit {
  products: product[] = [
    { code: 'h1', name: 'Pink Band', category: 'ok', quantity: 4 },
    { code: 'h2', name: 'Blue Band', category: 'not ok', quantity: 4 },
  ];
  constructor() {}

  ngOnInit(): void {}
}

interface product {
  code: string;
  name: string;
  category: string;
  quantity: number;
}
