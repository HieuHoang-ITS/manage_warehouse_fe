import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { FeatureStatisticComponent } from './statis/statis.component';

const routes: Routes = [
  { path: 'orders/total', component: NewOrderComponent },
  { path: 'orders/export', component: NewOrderComponent },
  { path: 'orders/import', component: NewOrderComponent },
  { path: 'orders/import/register', component: AddNewOrderComponent },
  { path: 'orders/export/register', component: AddNewOrderComponent },
  { path: '/statistic', component: FeatureStatisticComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
