import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategorytService } from '../../services/category.service';
import { ConfirmationService, MenuItem, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  type_tradings: string[] = ['Name', 'Xuất'];
  category: Category[] = [];
  addCategory: Category = {} as any;
  items: MenuItem[] = [];
  items1: MenuItem[] = [];
  displaySaveDiglog: boolean = false;
  msgs: Message[] = []
  selectedCategory: Category = {} as any
  name?: string;
  status?: string;
  ten?: String
  constructor(private categoryService: CategorytService, private messageService: MessageService, private confirmService: ConfirmationService) { }
  getAll() {
    this.categoryService.getAll().subscribe(
      (result: any) => {
        this.category = result;
      },
      error => {
      }

    )
  }
  refrsesh() {
    this.getAll()
    this.ten = '';
  }
  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedCategory != null && this.selectedCategory.id != null) {
        this.addCategory = this.selectedCategory;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "chon muc can update" });
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
        (Response: any) => {
          this.categoryService = Response
        }
      )

    }
    else {
      this.categoryService.update(ca, ca.id).subscribe(() =>
        this.categoryService.getAll().subscribe(
          (result: any) => {
            this.category = result;

          },
          error => {
          }

        ));

    }

    this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Via MessageService" })
    this.displaySaveDiglog = false
    setTimeout(() => {
      this.getAll();
    }, 500);
  }

  deletecategory() {
    if (this.selectedCategory == null || this.selectedCategory.id == null) {
      this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "hay chon muc can xoa" });
      return;
    }
    this.confirmService.confirm({
      message: " ban co muon xoa khong",
      accept: () => {
        this.categoryService.delete(this.selectedCategory.id).subscribe(
          (result: any) => {
          }
        )
        this.messageService.add({ severity: 'success', summary: "Delete", detail: "Record with id= '" + this.selectedCategory.id + "' has been deleted" })
        this.deleteObject(this.selectedCategory.id)
      }
    })
  }
  deleteObject(id: number) {
    let index = this.category.findIndex((e) => e.id == id);
    if (index != -1) {
      this.category.splice(index, 1);
    }
  }
  search(name: String) {
    this.categoryService.search(name).subscribe(
      Response => {
        this.category = Response;
      }
    )
  }
  ngOnInit(): void {

    this.getAll()
    this.items1 = [
      {
        label: "AddCategory",
        icon: "pi pi-fw pi-user-plus",
        command: () => this.showSaveDialog(false)
      },

    ]
  }
}


