import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../domain/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('/api/articles');
  }

  getArticle(id: string | null): Observable<Article> {
    return this.http.get<Article>('/api/articles/' + id);
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>('/api/articles', article);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>('/api/articles', article);
  }

}
