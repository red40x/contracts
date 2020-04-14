import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private router: Router) {}

  /**
   * Аутентификация пользователя
   */
  login() {
    localStorage.setItem('isAuth', 'true');
    this.router.navigate(['/contracts/list']);
  }

  /**
   * Отмена аутентификации пользователя
   */
  logout() {
    localStorage.removeItem('isAuth');
    this.router.navigate(['/login']);
  }
}
