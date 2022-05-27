import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Order } from '../models/order';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../services/order.service';
import { User } from '../models/user';
@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss']
})
export class OrderstatusComponent implements OnInit {
  nhanvien?: User;
  statuss: string[]=["thanhcong","huy"];
  type_tradings: string[]=["nhap","xuat"];
  description?: string;
  users?: any[]=[];
  geeks: boolean=false;
  selectstatus?: string;
  orders: Order[]=[];
  order?: Order;
  orderDetail: any[]=[];
  status?: string;
  constructor( private route: ActivatedRoute, private location: Location, private orderService: OrderService, private primengConfig: PrimeNGConfig) { }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    const type = parseInt(this.route.snapshot.paramMap.get('type')!, 10);
    this.getOrder(type)
    console.log(this.route.url);
  }
  getOrder(type: any) : void{
    this.orderService.getOrders(type).subscribe(data=>{ this.orders=data;});
    this.orderService.getUsers().subscribe(data=>{this.users=data})
    console.log(this.users);
  }
  detailOrder(order: Order): void{
    //console.log("dung");
    this.geeks=true;
    this.order=order;
    this.orderService.getOrderDetail(order.id).subscribe(data=>{this.orderDetail=data; console.log(data)});
  
  }
  updateOrder(order: Order, description: string, status: string): void{
    // alert(order.customer_name);
    if(description=="")
    {
      alert(order.description);
    }
    else{
    this.geeks=false;
    order.description=description;
    order.status=status;
   if(order.trading_type="import")
   {
    this.orderService.updateOrder(order.id,order).subscribe(
      ()=>{this.orderService.getOrders(1).subscribe(data=> this.orders=data)});
    }
    if(order.trading_type="export")
    {
     this.orderService.updateOrder(order.id,order).subscribe(
       ()=>{this.orderService.getOrders(2).subscribe(data=> this.orders=data)});
    }
    }
  }
  Search(mahoadon: string, searchtime: Date, loaihoadon: number) : void
  {
    if(searchtime instanceof Date)
    {
      let date: Date = new Date("2019-01-16");  
      searchtime=date;
    }
    alert(searchtime);
  }
}
