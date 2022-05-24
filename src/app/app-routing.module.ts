import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: OrderstatusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
