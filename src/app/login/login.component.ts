import {Component} from '@angular/core';
import {LoginFormGroup} from './login.form-group';
import {AuthService} from '../service/auth.service';
import {Router} from "@angular/router";
import {ComponentErrorStateMatcher} from "../ComponentErrorStateMatcher";
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatFormField, MatLabel, MatInput, MatError } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [MatGridList, MatGridTile, MatFormField, MatLabel, MatInput, ReactiveFormsModule, MatError, MatButton]
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
