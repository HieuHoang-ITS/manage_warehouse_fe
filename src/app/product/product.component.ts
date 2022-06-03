import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { productDisplay } from '../models/order-display';
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
  selectedProduct: productDisplay = {} as any
  productList: productDisplay[] = [];
  nhacap?: String
  tenhang?: String
  loaihang?: String

  constructor(private productService: ProductService, private messageService: MessageService, private confirmService: ConfirmationService) { }
  getAll() {
    this.productService.getAll().subscribe(
      (result: any) => {
        this.productList = result;
        console.log(result)
      },
      error => {
        console.log(error)
      }

    )
  }
  refrsesh() {
    this.getAll()
    this.nhacap = '';
    this.loaihang = '';
    this.tenhang = '';
  }
  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedProduct != null && this.selectedProduct.id != null) {
        this.addProduct.name = this.selectedProduct.product_name;
        this.addProduct.unit = this.selectedProduct.unit
        this.addProduct.amount = this.selectedProduct.amount
        this.addProduct.price = this.selectedProduct.price;
        this.addProduct.category_id = 1;
        this.addProduct.provider_id = 1;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "chon muc can update" });
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
      this.productService.save(pr).subscribe(
        Response => { console.log(Response) }
      )
      setTimeout(() => {
        this.getAll();
      }, 500);
    }

    else {
      console.log(pr)
      this.productService.update(pr, pr.id).subscribe(() =>
        this.productService.getAll().subscribe(
          (result: any) => {
            this.product = result;
          },
          error => {
            console.log(error)
          }

        ));
    }

    this.messageService.add({ severity: 'success', summary: "Resultado", detail: "add thanh cong" })
    this.displaySaveDiglog = false
  }
  deletecategory() {
    if (this.selectedProduct == null || this.selectedProduct.id == null) {
      this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "chon muc can xoa" });
      return;
    }
    this.confirmService.confirm({
      message: " ban co muon xoa khong",
      accept: () => {
        this.productService.delete(this.selectedProduct.id).subscribe(
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
  search(tenhanghoa: String, loaihanghoa: String, nhacungcap: String) {
    this.productService.search(tenhanghoa, loaihanghoa, nhacungcap).subscribe(
      Response => {
        this.productList = Response;
        console.log(Response)

      }

    )

  }
  ngOnInit(): void {

    this.getAll()
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




}
