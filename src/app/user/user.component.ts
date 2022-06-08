import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: User[] = [];
  addUser: User = {} as any;
  items: MenuItem[] = [];
  items1: MenuItem[] = [];
  displaySaveDiglog: boolean = false;
  msgs: Message[] = []
  selectedUser: User = {} as any
  ten?: String
  mail?: String
  sdt?: String
  constructor(private userService: UserService, private messageService: MessageService, private confirmService: ConfirmationService) { }

  getAll() {
    this.userService.getAll().subscribe(
      (result: any) => {
        this.user = result;
      },
      error => {
        console.log(error)
      }

    )
  }
  refrsesh() {
    this.getAll()
    this.ten = ''
    this.mail = ''
    this.sdt = ''
  }
  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedUser != null && this.selectedUser.id != null) {
        this.addUser = this.selectedUser;
      } else {
        this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "chon muc can update" });
        return;
      }
    } else {
      this.addUser = {
        id: null,
        full_name: "",
        email: "",
        tel: "",
        address: ""
      };
    }
    this.displaySaveDiglog = true;
  }
  save() {
    let ca = {
      id: this.addUser.id,
      full_name: this.addUser.full_name,
      email: this.addUser.email,
      tel: this.addUser.tel,
      address: this.addUser.address,
    };
    if (ca.id == null) {
      this.userService.save(ca).subscribe(
        Response => {
          console.log(Response)
        }
      )
      setTimeout(() => {
        this.getAll();
      }, 500);
    }
    else {
      console.log(ca)
      this.userService.update(ca, ca.id).subscribe(() =>
        this.userService.getAll().subscribe(
          (result: any) => {
            this.user = result;

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
    if (this.selectedUser == null || this.selectedUser.id == null) {
      this.messageService.add({ severity: 'warn', summary: "Advertencia!", detail: "chon muc can xoa" });
      return;
    }
    this.confirmService.confirm({
      message: " ban co muon xoa khong",
      accept: () => {
        this.userService.delete(this.selectedUser.id).subscribe(
          (result: any) => {
            console.log('')
          }
        )
        this.messageService.add({ severity: 'success', summary: "Delete", detail: "Record with id= '" + this.selectedUser.id + "' has been deleted" })
        this.deleteObject(this.selectedUser.id)
      }
    })
  }
  deleteObject(id: number) {
    console.log('Delete object check')
    let index = this.user.findIndex((e) => e.id == id);
    if (index != -1) {
      this.user.splice(index, 1);
    }
  }
  search(name: String, email: String, tel: String) {
    this.userService.search(name, email, tel).subscribe(
      Response => {
        this.user = Response;
        console.log(Response)

      }

    )
  }
  ngOnInit(): void {

    this.getAll()
    this.items1 = [
      {
        label: "AddUser",
        icon: "pi pi-fw pi-user-plus",
        command: () => this.showSaveDialog(false)
      },
      // {
      //   label: "Editar",
      //   icon: "pi pi-fw pi-user-edit",
      //   command: () => this.showSaveDialog(true)
      // },
      // {
      //   label: "Delete",
      //   icon: "pi pi-fw pi-trash",
      //   command: () => this.deletecategory()

      // }
    ]
  }
}
