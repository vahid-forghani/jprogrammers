import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Login} from "../domain/login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private http: HttpClient) {
    this.verify();
  }

  public verify(): void {
    this.http.post<boolean>('/api/verify', {token: localStorage.getItem('token')})
      .subscribe({
        next: value => this.isLoggedIn = value,
        error: _ => this.isLoggedIn = false
      });
  }

  login(login: Login): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/login', login);
  }

  logout() {
    localStorage.removeItem('token');
    this.verify();
  }
}
