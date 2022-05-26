import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategorytService } from '../services/category.service';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category: Category[] = [];
  items: MenuItem[] = [];
  items1: MenuItem[] = [];
  displaySaveDiglog: boolean = false;
  category1: Category = {
    id: null,
    name: '',
    status: '',
  };
  constructor(private categoryService: CategorytService, private messageService: MessageService) { }
  getAll() {
    this.categoryService.getAll().subscribe(
      (result: any) => {
        this.category = result;
      },
      error => {
        console.log(error)
      }

    )
  }
  showSaveDialog() {
    this.displaySaveDiglog = true;
  }
  save(addname: string, addstatus: string) {
    this.categoryService.save(addname, addstatus).subscribe(
      (result: any) => {
        console.log(result)
      },
      error => {
        console.log(error)
      }

    )
  }
  ngOnInit(): void {

    this.getAll()
    this.items = [
      {
        label: 'Options',
        items: [{
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
            this.update();
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-times',
          command: () => {
            this.delete();
          }
        }
        ]
      },
      {
        label: 'Navigate',
        items: [{
          label: 'Angular Website',
          icon: 'pi pi-external-link',
          url: 'http://angular.io'
        },
        {
          label: 'Router',
          icon: 'pi pi-upload',
          routerLink: '/fileupload'
        }
        ]
      }
    ];
    this.items1 = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-user-plus",
        command: () => this.showSaveDialog()
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-user-edit",

      }
    ]
  }
  update() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
    this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }
}


