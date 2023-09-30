import {Component} from '@angular/core';
import {LoginFormGroup} from './login.form-group';
import {AuthService} from '../service/auth.service';
import {Router} from "@angular/router";
import {ComponentErrorStateMatcher} from "../ComponentErrorStateMatcher";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new LoginFormGroup();
  matcher = new ComponentErrorStateMatcher();

  constructor(private authService: AuthService, private router: Router) {

  }

  login() {
    this.authService.login(this.loginForm.toResource())
    .subscribe({
      next: response => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/').then(_ => this.authService.verify());
        },
      error: _ => {
        this.loginForm.controls.username.setErrors({invalidUsernameOrPassword: true});
      }
    });
  }
}
