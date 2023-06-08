import { FormControl, FormGroup } from "@angular/forms";
import { Category } from "../domain/category";
import { CategoryForm } from "./category.form";

export class CategoryFormGroup extends FormGroup<CategoryForm> {
  constructor() {
    super({
      _id: new FormControl<string>('', {nonNullable: true}),
      name: new FormControl<string>('', {nonNullable: true}),
      edit: new FormControl<boolean>(false, {nonNullable: true})
    });
  }

  toResource(): Category {
    return this.value as Category;
  }
}
