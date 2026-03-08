import { Component } from '@angular/core';
import { Article } from '../domain/article';
import { ArticleService } from '../service/article.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [
    MatCardModule,
    RouterLink
  ]
})
export class ArticlesComponent {

  articles: Article[] = [];

  constructor(articleService: ArticleService) {
    articleService.getArticles().subscribe(articles => this.articles = articles);
  }

}
