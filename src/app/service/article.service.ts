import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../domain/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  URL_PREFIX = '/api/articles';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.URL_PREFIX);
  }

  getArticle(id: string | null): Observable<Article> {
    return this.http.get<Article>(`${this.URL_PREFIX}/${id}`);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(this.URL_PREFIX, article);
  }

  uploadImage(id: string, data: FormData): Observable<void> {
    return this.http.post<void>(`${this.URL_PREFIX}/${id}/image/upload`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL_PREFIX}/${id}`);
  }
}
