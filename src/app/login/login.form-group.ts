import { FormControl, FormGroup } from "@angular/forms";
import { LoginForm } from "./login.form";
import { Login } from "../domain/login";

export class LoginFormGroup extends FormGroup<LoginForm> {
  constructor() {
    super({
      username: new FormControl<string>('', {nonNullable: true}),
      password: new FormControl<string>('', {nonNullable: true})
    });
  }

  toResource(): Login {
    return this.value as Login;
  }
}
