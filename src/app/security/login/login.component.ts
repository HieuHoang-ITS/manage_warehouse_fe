import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { HttpStatusCodeConstants } from '../../shared-component/common/constants'
import { TokenStorageService } from '../token-storage.service';
import { eRole } from '../../shared-component/common/common-filter'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});
  public submitted: boolean = false;
  public loginFailed: boolean = true;
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService,
    private router: Router
  ) { }
  ngOnInit(): void {
    let role = this.tokenStorage.getUser().role;
    if(role != undefined && role.length>0){
      this.redirectBeforeLogin(role);
    }
    else{
      this.initLoginForm();
    }
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  setRequired() {
    this.loginForm.controls['username'].setValidators([Validators.required]);
    this.loginForm.controls['password'].setValidators([Validators.required]);

    this.loginForm.controls["username"].updateValueAndValidity();
    this.loginForm.controls["password"].updateValueAndValidity();
  }

  get getControl(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    this.setRequired();
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((response) => {
      if (response.status === HttpStatusCodeConstants.HTTP_STATUS_200) {
        let user = response.item;
        let token = user.token;
        if (token) {
          this.loginFailed = false;
          this.tokenStorage.saveToken(token);
          this.tokenStorage.saveUser(user);
          let role = this.tokenStorage.getUser().role;
          this.redirectBeforeLogin(role);
        }
      }
      else {
        this.loginFailed = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Login failed'
        })
      }
    }, (error) => {
      this.loginFailed = true;
    })
  }
  redirectBeforeLogin(role: any) {
    if (role.indexOf(eRole.SYSTEM_ADMIN) >= 0) {
      this.router.navigate(['/system/home']);
    } else if(role.indexOf(eRole.STATISTICS_ADMIN) >= 0) {
      this.router.navigate(['/system/statistic']);
    } else if(role.indexOf(eRole.ORDERS_ADMIN) >= 0) {
      this.router.navigate(['/system/orders/record']);
    } else if(role.indexOf(eRole.APPROVERS_ADMIN) >= 0) {
      this.router.navigate(['/system/orderstatus/import/1']);
    } else if(role.indexOf(eRole.SYSTEM_INFO_ADMIN) >= 0) {
      this.router.navigate(['/system/category']);
    } 
  }
}
