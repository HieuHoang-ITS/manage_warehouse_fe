import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './new-order/new-order.component';

const routes: Routes = [
  { path: 'orders', component: NewOrderComponent },
  { path: 'orders/export', component: NewOrderComponent },
  { path: 'orders/import', component: NewOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
