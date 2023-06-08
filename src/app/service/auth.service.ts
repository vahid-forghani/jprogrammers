import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Login } from "../domain/login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private http: HttpClient) {
    this.verify(localStorage.getItem('token')).subscribe(value => this.isLoggedIn = value);
  }

  login(login: Login): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/login', login);
  }

  private verify(token: string | null) {
    return this.http.post<boolean>('/api/verify', {token});
  }

}
