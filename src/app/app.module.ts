import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { CategoryComponent } from './category/category.component';
import { ProviderComponent } from './provider/provider.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { FeatureStatisticComponent } from './statis/statis.component';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { DragDropModule } from 'primeng/dragdrop';
import { TabViewModule } from 'primeng/tabview';
import { HomepageComponent } from './homepage/homepage.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';

@NgModule({
  declarations: [
    AppComponent,
    FeatureStatisticComponent,
    NewOrderComponent,
    DetailOrderComponent,
    AddNewOrderComponent,
    HomepageComponent,
    OrderstatusComponent,
    CategoryComponent,
    ProviderComponent,
    ProductComponent,
    UserComponent

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
    PanelModule,
    BrowserAnimationsModule,
    MenuModule,
    DialogModule,
    ConfirmDialogModule,
    MessageModule,
    ToastModule,
    ToolbarModule,
    MessagesModule,
    DropdownModule,
    DragDropModule,
    TabViewModule,
    ChartModule,
    CalendarModule,

  ],

  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
