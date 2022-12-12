import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SystemRoutingModule } from './system-routing-module';
import { FeatureStatisticComponent } from './statis/statis.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import { CategoryComponent } from './category/category.component';
import { ProviderComponent } from './provider/provider.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { WarehouseModule } from '../warehouse-module';
import { HomepageComponent } from './homepage/homepage.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AddNewOrderComponent,
    CategoryComponent,
    DetailOrderComponent,
    HomepageComponent,
    NewOrderComponent,
    OrderstatusComponent,
    ProductComponent,
    ProviderComponent,
    FeatureStatisticComponent,
    UserComponent
  ],
  exports: [
    DynamicDialogModule
  ],
  imports: [CommonModule, SystemRoutingModule, WarehouseModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemModule { }
