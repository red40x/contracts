import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../shared/services/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required
      ])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login();
    }
  }
}
