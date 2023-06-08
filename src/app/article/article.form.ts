import { FormControl } from "@angular/forms";

export interface ArticleForm {
  _id: FormControl<string>;
  title: FormControl<string>;
  description: FormControl<string>;
  content: FormControl<string>;
}
