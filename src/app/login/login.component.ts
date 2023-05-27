import { Component } from '@angular/core';
import { LoginFormGroup } from './LoginFormGroup';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new LoginFormGroup();

  constructor(private authService: AuthService) {

  }

  login() {
    this.authService.login(this.loginForm.toResource())
    .subscribe(response => localStorage.setItem('token', response.token));
  }

}
