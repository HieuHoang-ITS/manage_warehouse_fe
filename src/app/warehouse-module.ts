import { NgModule } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
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
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    OverlayPanelModule,
    InputTextareaModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    InputTextModule,
    MenubarModule,
    ButtonModule,
    AccordionModule,
    PanelModule,
    MenuModule,
    ChartModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    ToolbarModule,
    MessagesModule,
    MessageModule,
    TableModule,
    DragDropModule,
    TabViewModule,
    ConfirmDialogModule,
    ToastModule,
    MultiSelectModule,
    CommonModule,
    DialogModule
  ],
  exports: [
    FormsModule,
    OverlayPanelModule,
    InputTextareaModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    InputTextModule,
    MenubarModule,
    ButtonModule,
    AccordionModule,
    PanelModule,
    MenuModule,
    ChartModule,
    CalendarModule,
    DialogModule,
    DropdownModule,
    ToolbarModule,
    MessagesModule,
    MessageModule,
    TableModule,
    DragDropModule,
    TabViewModule,
    ConfirmDialogModule,
    ToastModule,
    MultiSelectModule,
    CommonModule,
    DialogModule
  ],
  providers: [DynamicDialogConfig, DynamicDialogRef, DialogService],
})
export class WarehouseModule { }
