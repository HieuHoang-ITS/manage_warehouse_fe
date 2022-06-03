import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategorytService } from '../services/category.service';
import { ConfirmationService, MenuItem, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category: Category[] = [];
  addCategory: Category = {} as any;
  items: MenuItem[] = [];
  items1: MenuItem[] = [];
  displaySaveDiglog: boolean = false;
  msgs: Message[] = []
  selectedCategory: Category = {} as any

  constructor(private categoryService: CategorytService, private messageService: MessageService, private confirmService: ConfirmationService) { }
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
  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedCategory != null && this.selectedCategory.id != null) {
        this.addCategory = this.selectedCategory;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "Por favor seleccione un registro" });
        return;
      }
    } else {
      this.addCategory = { id: null, name: '', status: '' };
    }
    this.displaySaveDiglog = true;
  }
  save() {
    let ca = {
      id: this.addCategory.id,
      name: this.addCategory.name,
      status: this.addCategory.status,
    };
    if (ca.id == null) {
      this.categoryService.save(ca).subscribe(
        Response => {
          console.log(Response)
        }
      )
      ca.id = this.category[this.category.length - 1].id + 1
      this.category.push(ca as Category)
      console.log("add function")
    }
    else {
      console.log(ca)
      this.categoryService.update(ca, ca.id).subscribe(() =>
        this.categoryService.getAll().subscribe(
          (result: any) => {
            this.category = result;

          },
          error => {
            console.log(error)
          }

        ));
    }

    this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Via MessageService" })

  }

  deletecategory() {
    if (this.selectedCategory == null || this.selectedCategory.id == null) {
      this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "Por favor seleccione un registro" });
      return;
    }
    this.confirmService.confirm({
      message: " ban co muon xoa khong",
      accept: () => {
        this.categoryService.delete(this.selectedCategory.id).subscribe(
          (result: any) => {
            console.log('')
          }
        )
        this.messageService.add({ severity: 'success', summary: "Delete", detail: "Record with id= '" + this.selectedCategory.id + "' has been deleted" })
        this.deleteObject(this.selectedCategory.id)
      }
    })
  }
  deleteObject(id: number) {
    console.log('Delete object check')
    let index = this.category.findIndex((e) => e.id == id);
    if (index != -1) {
      this.category.splice(index, 1);
    }
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
        label: "AddCategory",
        icon: "pi pi-fw pi-user-plus",
        command: () => this.showSaveDialog(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-user-edit",
        command: () => this.showSaveDialog(true)
      },
      {
        label: "Delete",
        icon: "pi pi-fw pi-trash",
        command: () => this.deletecategory()

      }
    ]
  }
  update() {
    this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
    this.msgs.push({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }
}


