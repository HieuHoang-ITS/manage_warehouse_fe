import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//primeng
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { FeatureStatisticComponent } from './feature-statistic/feature-statistic.component';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
@NgModule({
  declarations: [AppComponent, FeatureStatisticComponent],
  imports: [
    FormsModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    AccordionModule,
    ChartModule,
    CalendarModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
