import { Component, OnInit, } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { Provider } from '../models/provider';
import { ProvidertService } from '../services/provider.service';
@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  provider: Provider[] = [];
  addProvider: Provider = {} as any;
  items: MenuItem[] = [];
  items1: MenuItem[] = [];
  displaySaveDiglog: boolean = false;
  msgs: Message[] = []
  selectedProvider: Provider = {} as any
  diachi?: string
  sdt?: String
  constructor(private providerService: ProvidertService, private messageService: MessageService, private confirmService: ConfirmationService) { }
  getAll() {

    this.providerService.getAll().subscribe(

      (result: any) => {
        console.log("hieu")
        this.provider = result;
      },
      error => {
        console.log(error)
      }
    )
  }
  refrsesh() {
    this.getAll()
    this.diachi = '';
    this.sdt = '';

  }
  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedProvider != null && this.selectedProvider.id != null) {
        this.addProvider = this.selectedProvider;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "chon muc can update" });
        return;
      }
    } else {
      this.addProvider = { id: null, name: '', address: '', tel: '', status: '' };
    }
    this.displaySaveDiglog = true;
  }
  save() {
    let prv = {
      id: this.addProvider.id,
      name: this.addProvider.name,
      address: this.addProvider.address,
      tel: this.addProvider.tel,
      status: this.addProvider.status,
    };
    if (prv.id == null) {
      this.providerService.save(prv).subscribe(
        Response => {
          console.log(Response)
        }
      )
      setTimeout(() => {
        this.getAll();
      }, 500);
    }

    else {
      console.log(prv)
      this.providerService.update(prv, prv.id).subscribe(() =>
        this.providerService.getAll().subscribe(
          (result: any) => {
            this.provider = result;

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
    if (this.selectedProvider == null || this.selectedProvider.id == null) {
      this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "hay chon muc can xoa" });
      return;
    }
    this.confirmService.confirm({
      message: " ban co muon xoa khong",
      accept: () => {
        this.providerService.delete(this.selectedProvider.id).subscribe(
          (result: any) => {
            console.log('')
          }
        )
        this.messageService.add({ severity: 'success', summary: "Delete", detail: "Record with id= '" + this.selectedProvider.id + "' has been deleted" })
        this.deleteObject(this.selectedProvider.id)
      }
    })
  }
  deleteObject(id: number) {
    console.log('Delete object check')
    let index = this.provider.findIndex((e) => e.id == id);
    if (index != -1) {
      this.provider.splice(index, 1);
    }
  }
  search(address: String, tel: String) {
    this.providerService.search(address, tel).subscribe(
      Response => {
        this.provider = Response;
        console.log(Response)

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
        label: "AddProvider",
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
