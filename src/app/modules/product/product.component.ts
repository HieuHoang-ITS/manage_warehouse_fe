import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { Category } from '../../models/category';
import { productDisplay } from '../../models/order-display';
import { Product } from '../../models/product';
import { Provider } from '../../models/provider';
import { ProductService } from '../../services/product.service';

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
  Categories: Category[] = [];
  Providers: Provider[] = [];
  selectedCategory?: Category;
  selectedProvider?: Provider;
  constructor(private productService: ProductService, private messageService: MessageService, private confirmService: ConfirmationService) { }
  getAll() {
    this.productService.getAll().subscribe(
      (result: any) => {
        this.productList = result;
        this.productList = this.productList.sort((a, b) => (a.id > b.id ? 1 : -1));
      },
      error => {
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
        this.addProduct.id = this.selectedProduct.id;
        this.addProduct.name = this.selectedProduct.product_name;
        this.addProduct.price = this.selectedProduct.price;
        this.addProduct.unit = this.selectedProduct.unit;
        this.addProduct.amount = this.selectedProduct.amount;
        this.Providers.forEach(item => {
          if (item.name.toLowerCase().match(this.selectedProduct.provider_name.toLowerCase())) {
            this.selectedProvider = item
            this.addProduct.provider_id = item.id;
          }
        })
        this.Categories.forEach(item => {
          if (item.name.toLowerCase().match(this.selectedProduct.category_name.toLowerCase())) {
            this.selectedCategory = item
            this.addProduct.category_id = item.id;
          }
        })
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
      category_id: this.selectedCategory?.id,
      provider_id: this.selectedProvider?.id,
    };
    if (pr.id == null) {
      this.productService.save(pr).subscribe(
        Response => { }
      )
    }
    else {
      this.productService.update(pr, pr.id).subscribe(() =>
        this.productService.getAll().subscribe(
          (result: any) => {
            this.product = result;
          },
          error => {
          }

        ));
    }
    setTimeout(() => {
      this.getAll();
    }, 500);

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
          }
        )
        this.messageService.add({ severity: 'success', summary: "Delete", detail: "Record with id= '" + this.selectedProduct.id + "' has been deleted" })
        this.deleteObject(this.selectedProduct.id)
        setTimeout(() => {
          this.getAll();
        }, 500);
      }
    })
  }
  deleteObject(id: number) {
    let index = this.product.findIndex((e) => e.id == id);
    if (index != -1) {
      this.product.splice(index, 1);
    }
  }
  search(tenhanghoa: String, loaihanghoa: String, nhacungcap: String) {
    this.productService.search(tenhanghoa, loaihanghoa, nhacungcap).subscribe(
      Response => {
        this.productList = Response;

      }
    )
  }
  ngOnInit(): void {

    this.getAll();

    this.items1 = [
      {
        label: "AddProduct",
        icon: "pi pi-fw pi-user-plus",
        command: () => this.showSaveDialog(false)
      },
    ]
    this.gellAllCategoryProvider()
  }

  gellAllCategoryProvider() {
    this.productService.getAllCategory().subscribe(
      response => {
        this.Categories = response;
      });
    this.productService.getAllProvider().subscribe(
      response => {
        this.Providers = response;
      });
  }
}
