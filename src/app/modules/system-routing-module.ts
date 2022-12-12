import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { ProductComponent } from './product/product.component';
import { FeatureStatisticComponent } from './statis/statis.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { ProviderComponent } from './provider/provider.component';
import { UserComponent } from './user/user.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: 'orders/import', component: NewOrderComponent },
  { path: 'orders/export', component: NewOrderComponent },
  { path: 'orders/record', component: NewOrderComponent },
  { path: 'statistic', component: FeatureStatisticComponent },
  { path: 'orderstatus/import/:type', component: OrderstatusComponent },
  { path: 'orderstatus/export/:type', component: OrderstatusComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'provider', component: ProviderComponent },
  { path: 'product', component: ProductComponent },
  { path: 'user', component: UserComponent },
  { path: 'home', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule { }
