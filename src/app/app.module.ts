import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {InputTextareaModule} from 'primeng/inputtextarea';
//Component
import { UserComponent } from './user/user.component';
import { FeatureStatisticComponent } from './statis/statis.component';
import { CategoryComponent } from './category/category.component';
import { ProviderComponent } from './provider/provider.component';
import { ProductComponent } from './product/product.component';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { NewOrderComponent } from './new-order/new-order.component';
//primeng
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { DragDropModule } from 'primeng/dragdrop';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HomepageComponent } from './homepage/homepage.component';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@NgModule({
  declarations: [
    AppComponent,
    FeatureStatisticComponent,
    NewOrderComponent,
    DetailOrderComponent,
    AddNewOrderComponent,
    CategoryComponent,
    ProviderComponent,
    UserComponent,
    ProductComponent,
    HomepageComponent,
    OrderstatusComponent,
    CategoryComponent,
    ProviderComponent,
    ProductComponent,
    UserComponent,
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
    ChartModule,
    CalendarModule,
    ToolbarModule,
    MessagesModule,
    DropdownModule,
    DragDropModule,
    TabViewModule,
    ChartModule,
    CalendarModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextareaModule,
    MultiSelectModule,
    OverlayPanelModule,

  ],

  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
