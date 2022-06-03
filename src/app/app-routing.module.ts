import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { ProductComponent } from './product/product.component';
import { FeatureStatisticComponent } from './statis/statis.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { ProviderComponent } from './provider/provider.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'orders/import', component: NewOrderComponent },
  { path: 'orders/export', component: NewOrderComponent },
  { path: 'orders/record', component: NewOrderComponent },

  { path: 'statistic', component: FeatureStatisticComponent },

  { path: 'orderstatus/import/:type', component: OrderstatusComponent },
  { path: 'orderstatus/export/:type', component: OrderstatusComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'provider', component: ProviderComponent },
  { path: 'user', component: UserComponent },
  { path: 'product', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
