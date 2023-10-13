import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleService} from '../service/article.service';
import {AuthService} from '../service/auth.service';
import {ArticleFormGroup} from './article.form-qroup';
import {Article} from '../domain/article';
import {highlightAll} from 'prismjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, AfterViewChecked {

  article = new ArticleFormGroup();
  formFata = new FormData();

  @Input()
  articleId: string | undefined = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private authService: AuthService) {

  }

  ngOnInit() {
    this.articleService.getArticle(this.articleId || this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(article => this.article.patchValue(article));
  }

  ngAfterViewChecked() {
    highlightAll();
  }

  updateArticle(): void {
    this.articleService.updateArticle(this.article.value as Article).subscribe();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  uploadImage() {
    this.articleService.uploadImage(this.article.controls.id.value, this.formFata).subscribe();
  }

  uploadAvatar() {
    this.articleService.uploadAvatar(this.article.controls.id.value, this.formFata).subscribe();
  }

  chooseFile(target: any) {
    const files = target.files;
    this.formFata.append('file', files[0], files[0].name);
  }
}
