import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { AuthService } from '../service/auth.service';
import { ArticleFormGroup } from './article.form-qroup';
import { Article } from '../domain/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

  article = new ArticleFormGroup();

  constructor(
    activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private authService: AuthService
  ) {
    articleService.getArticle(activatedRoute.snapshot.paramMap.get('id'))
    .subscribe(article => this.article.patchValue(article));
  }

  updateArticle(): void {
    this.articleService.updateArticle(this.article.value as Article).subscribe();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
