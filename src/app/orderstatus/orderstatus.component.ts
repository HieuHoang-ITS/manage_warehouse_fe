import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Order } from '../models/order';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../services/order.service';
import { User } from '../models/user';
import { DatePipe } from '@angular/common';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.scss']
})
export class OrderstatusComponent implements OnInit {
  first_description?: string;
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
  timeOrder?: Date;
  loaihoadon?: string;
  mahoadoan?: number;
  time?: string;
  first_status?: string;
  manhanvien?: number;
  constructor(private messageService: MessageService,private route: ActivatedRoute, private location: Location, private orderService: OrderService, private primengConfig: PrimeNGConfig) { }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    const type = parseInt(this.route.snapshot.paramMap.get('type')!, 10);
    this.getOrder(type)
    console.log(this.route.url);
  }
  getOrder(type: any) : void{
    this.orderService.getOrders(type).subscribe(data=>{ this.orders=data;
     });
    this.orderService.getUsers().subscribe(data=>{this.users=data})
    
  }
  detailOrder(order: Order): void{
    //console.log("dung");
    this.geeks=true;
    this.order=order;
    this.orderService.getOrderDetail(order.id).subscribe(data=>{this.orderDetail=data; console.log(data)});
  }
  updateOrder(order: Order, description: string, status: string): void{
    // alert(order.customer_name);
    if(description.trim()=="" || !status)
    {
      this.messageService.add({severity:'error', summary:'Cập nhật không thành công', detail:'chọn trạng thái, ghi rõ lí do'});
    }
    else{
    this.geeks=false;
    order.description=description;
    this.first_description='';
    this.first_status="";
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
  
 ClickedOut(event: any) {
  if(event.target.className === "hover_bkgr_fricc") {
    this.geeks = false;
    this.first_description='';
  } 
}
  clickshow(event: any)
  {
    this.first_description='';
  }
  Search(mahoadon: string, searchtime: Date, loaihoadon: string) : void
  {
    if(searchtime)
    {
      this.timeOrder=searchtime;
      let year=searchtime.toLocaleString('en-us', { year: 'numeric' })
      let longMonth = searchtime.toLocaleString('en-us', { month: 'numeric' })
      let day=searchtime.toLocaleString('en-us', { day: 'numeric' })
      this.time=""+year;
      this.time+="-"+longMonth; 
      this.time+="-"+day;
     // alert(this.time);
    }
    else{
      let date: Date = new Date("000-00-00"); 
      this.timeOrder=date;
      this.time="0000-00-00";
    }
    if(loaihoadon)
    {
      if(loaihoadon==="nhap")
      {
        this.loaihoadon="import";
      }
      if(loaihoadon==="xuat")
      {
        this.loaihoadon="export";
      }
    }
    else
    {
      this.loaihoadon='o';
    }
    if(mahoadon)
    {
      this.mahoadoan=Number(mahoadon);
      if(isNaN(this.mahoadoan))
      this.mahoadoan=0;
      //alert(this.mahoadoan);
    }
    else{
      this.mahoadoan=0;
      //alert(this.mahoadoan);
    }
    if(this.nhanvien)
    {
      this.manhanvien=this.nhanvien.id;
      //alert(this.manhanvien);
    }
    else{
      this.manhanvien=0;
      //alert(this.manhanvien);
    }
    this.orderService.
    searchOrder(this.mahoadoan,this.manhanvien!,this.time,this.loaihoadon!)
    .subscribe(
      data=>
      {
        this.orders=data;  
        console.log(data)
      } 
     );
  }
}
