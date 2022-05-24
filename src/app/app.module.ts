import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//primeng
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { OrderstatusComponent } from './orderstatus/orderstatus.component';

@NgModule({
  declarations: [AppComponent, OrderstatusComponent],
  imports: [
    FormsModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    AccordionModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
