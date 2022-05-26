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
@NgModule({
  declarations: [AppComponent, CategoryComponent, ProviderComponent, ProductComponent, UserComponent],
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
    DialogModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
