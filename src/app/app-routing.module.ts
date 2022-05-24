import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureStatisticComponent } from './feature-statistic/feature-statistic.component';

const routes: Routes = [
  { path:'statistic', component: FeatureStatisticComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
