import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: Product[] = [];
  addProduct: Product = {} as any;
  items: MenuItem[] = [];
  items1: MenuItem[] = [];
  displaySaveDiglog: boolean = false;
  msgs: Message[] = []
  selectedProduct: Product = {} as any

  constructor(private productservice: ProductService, private messageService: MessageService, private confirmService: ConfirmationService) { }
  getAll() {
    this.productservice.getAll().subscribe(
      (result: any) => {
        this.product = result;
        console.log(result)
      },
      error => {
        console.log(error)
      }

    )
  }
  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedProduct != null && this.selectedProduct.id != null) {
        this.addProduct = this.selectedProduct;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "Por favor seleccione un registro" });
        return;
      }
    } else {
      this.addProduct = {
        id: null, name: '', unit: '',
        amount: 0,
        price: 0,
        category_id: 0,
        provider_id: 0,
      };
    }
    this.displaySaveDiglog = true;
  }
  save() {
    let pr = {
      id: this.addProduct.id,
      name: this.addProduct.name,
      unit: this.addProduct.unit,
      amount: this.addProduct.amount,
      price: this.addProduct.price,
      category_id: this.addProduct.category_id,
      provider_id: this.addProduct.provider_id
    };
    if (pr.id == null) {
      this.productservice.save(pr).subscribe(
        Response => { console.log(Response) }
      )
      console.log(pr)
      pr.id = this.product[this.product.length - 1].id + 1
      this.product.push(pr as Product)
    }

    else {
      console.log(pr)
      this.productservice.update(pr, pr.id).subscribe(() =>
        this.productservice.getAll().subscribe(
          (result: any) => {
            this.product = result;
          },
          error => {
            console.log(error)
          }

        ));
    }

    this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Via MessageService" })

  }
  deletecategory() {
    if (this.selectedProduct == null || this.selectedProduct.id == null) {
      this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "Por favor seleccione un registro" });
      return;
    }
    this.confirmService.confirm({
      message: " ban co muon xoa khong",
      accept: () => {
        this.productservice.delete(this.selectedProduct.id).subscribe(
          (result: any) => {
            console.log('')
          }
        )
        this.messageService.add({ severity: 'success', summary: "Delete", detail: "Record with id= '" + this.selectedProduct.id + "' has been deleted" })
        this.deleteObject(this.selectedProduct.id)
      }
    })
  }
  deleteObject(id: number) {
    console.log('Delete object check')
    let index = this.product.findIndex((e) => e.id == id);
    if (index != -1) {
      this.product.splice(index, 1);
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
        label: "AddProduct",
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
