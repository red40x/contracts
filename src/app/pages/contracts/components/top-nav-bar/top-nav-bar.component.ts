import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * Отмена аутентификации пользователя
   */
  onLogout() {
    this.authService.logout();
  }
}
