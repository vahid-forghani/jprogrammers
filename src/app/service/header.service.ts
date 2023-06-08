import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Category } from '../domain/category';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/categories');
  }

  addNewCategory(name: string): Observable<Category> {
    return this.http.post<Category>('/api/categories', {name});
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.patch<Category>('/api/categories', category);
  }

}
