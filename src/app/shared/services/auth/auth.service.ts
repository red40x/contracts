import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private router: Router) {}

  login() {
    localStorage.setItem('isAuth', 'true');
    this.router.navigate(['/contracts/list']);
  }

  logout() {
    localStorage.removeItem('isAuth');
    this.router.navigate(['/login']);
  }
}
