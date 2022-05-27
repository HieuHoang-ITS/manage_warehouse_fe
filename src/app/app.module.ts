import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import {ToolbarModule} from 'primeng/toolbar';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { NewOrderComponent } from './new-order/new-order.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent, 
    FeatureStatisticComponent,
    NewOrderComponent,
    DetailOrderComponent,
    AddNewOrderComponent
  ],
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
    MessageModule,
    DialogModule,
    DropdownModule,
    ToolbarModule,
    TableModule,
    MessagesModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}