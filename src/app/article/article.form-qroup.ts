import { FormControl, FormGroup } from "@angular/forms";
import { ArticleForm } from "./article.form";

export class ArticleFormGroup extends FormGroup<ArticleForm> {
  constructor() {
    super({
      _id: new FormControl<string>('', {nonNullable: true}),
      title: new FormControl<string>('', {nonNullable: true}),
      description: new FormControl<string>('', {nonNullable: true}),
      content: new FormControl<string>('', {nonNullable: true})
    });
  }
}
