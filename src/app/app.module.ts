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
import { FeatureStatisticComponent } from './statis/statis.component';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
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
    BrowserAnimationsModule,
    DialogModule,
    DropdownModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}