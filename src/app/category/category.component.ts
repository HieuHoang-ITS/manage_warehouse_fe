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
    const ca = {
      name: this.addCategory.name,
      status: this.addCategory.status,
      id: this.addCategory.id
    };
    this.categoryService.save(ca).subscribe(
      Response => {
        console.log(Response)

      }
    )
    this.category.push(ca as Category)
    this.validarCategory(this.addCategory)
    this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Via MessageService" })

  }
  validarCategory(addCategory: Category) {
    let index = this.category.findIndex((e) => e.id == addCategory.id);

    if (index != -1) {
      this.category[index] = addCategory;
    } else {
      this.category.push(addCategory);

    }

  }
  deletecategory() {
    if (this.selectedCategory == null || this.selectedCategory.id == null) {
      this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "Por favor seleccione un registro" });
      return;
    }
    this.confirmService.confirm({
      message: "",
      accept: () => {
        this.categoryService.delete(this.selectedCategory.id).subscribe(
          (result: any) => {
            this.messageService.add({ severity: 'success', summary: "resultsdo", detail: "alo" })
            this.deleteObject(result.id)
          }
        )
      }
    })
  }
  deleteObject(id: number) {
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


