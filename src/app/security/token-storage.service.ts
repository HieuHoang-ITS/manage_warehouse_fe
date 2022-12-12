import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';
import { AuthService } from '../services/auth.service';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  sub = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  signOut(): void {
    let token = this.getToken();
    this.authService
      .logout(token)
      .pipe(delay(500))
      .subscribe(
        (data) => {
          this.removeItem();
          this.router.navigate(['/login']);
        },
        (err) => {
          this.removeItem();
          this.router.navigate(['/login']);
        }
      );
  }
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveCacheSearch(screen: string, cache: any) {
    window.localStorage.setItem(screen, JSON.stringify(cache));
  }

  public getCacheSearch(screen: string) {
    return JSON.parse(window.localStorage.getItem(screen) as string);
  }

  public clearCacheSearch(screen: string) {
    window.localStorage.removeItem(screen);
  }

  public setLanguageDropdown(data: any) {
    this.sub.emit(data);
  }

  public clearAll() {
    window.localStorage.clear();
  }

  public removeItem() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  }
}
