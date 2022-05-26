import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//primeng
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { NewOrderComponent } from './new-order/new-order.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from 'primeng/toolbar';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import { DragDropModule } from 'primeng/dragdrop';
@NgModule({
  declarations: [
    AppComponent,
    NewOrderComponent,
    DetailOrderComponent,
    AddNewOrderComponent,
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
    TableModule,
    DialogModule,
    BrowserAnimationsModule,
    ToolbarModule,
    MessageModule,
    MessagesModule,
    DropdownModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
