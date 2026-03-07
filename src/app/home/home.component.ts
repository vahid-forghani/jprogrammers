import { Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { ArticlesComponent } from '../articles/articles.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [ArticleComponent, ArticlesComponent]
})
export class HomeComponent {

}
