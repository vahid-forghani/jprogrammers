import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../service/article.service';
import {AuthService} from '../service/auth.service';
import {ArticleFormGroup} from './article.form-qroup';
import {Article} from '../domain/article';
import {highlightAll} from 'prismjs';
import {Meta, Title} from "@angular/platform-browser";
import 'prismjs/components/prism-typescript';
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js';
import 'prismjs/plugins/toolbar/prism-toolbar.min.js';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, AfterViewChecked {

  REGEX_TO_FIND_CODE = /```(ts|js)([\s\S]*?)```|`([^`]+)`/g;
  article = new ArticleFormGroup();
  formFata = new FormData();

  @Input()
  articleId: string | undefined = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private authService: AuthService,
    private titleService: Title,
    private metaService: Meta,
    private router: Router) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(this.articleId || params['id'])
        .subscribe(article => {
          this.article.patchValue(article);
          this.setSEOTags(article);
        });
    });

  }

  ngAfterViewChecked() {
    highlightAll();
  }

  setSEOTags(article: Article) {
    this.titleService.setTitle(article.title);
    this.metaService.updateTag({name: 'title', content: article.title});
    this.metaService.updateTag({name: 'description', content: article.description});
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

  chooseFile(target: any) {
    const files = target.files;
    this.formFata.append('file', files[0], files[0].name);
  }

  deleteArticle() {
    this.articleService.delete(this.article.controls.id.value).subscribe(_ =>
      this.router.navigateByUrl('/'));
  }

  normalizeContent(): string {
    return this.article.controls.content.value
      .replace(this.REGEX_TO_FIND_CODE, (match, type, code, inlineCode) => {
        const languageClass = this.findLanguageClass(type);
        if (type)
          return `<pre><code class="${languageClass}">${code.replace('\n', '')}</code></pre>`;
        else if (inlineCode)
          return `<code class="${languageClass}">${inlineCode}</code>`;
        return '';
      });
  }

  findLanguageClass(type: string): string {
    switch (type) {
      case 'ts': return 'lang-typescript';
      case 'js': return 'lang-javascript';
    }
    return 'lang-none';
  }

}
