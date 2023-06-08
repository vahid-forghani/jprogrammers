import { Component } from '@angular/core';
import { Article } from '../domain/article';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {

  articles: Article[] = [];

  constructor(private articleService: ArticleService) {
    articleService.getArticles().subscribe(articles => this.articles = articles);
  }

  addNewArticle(): void {
    this.articleService.addArticle({} as Article).subscribe();
  }

}
