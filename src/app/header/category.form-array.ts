import { FormArray } from "@angular/forms";
import { Category } from "../domain/category";
import { CategoryForm } from "./category.form";
import { CategoryFormGroup } from "./category.form-group";

export class CategoryFormArray extends FormArray<CategoryFormGroup> {

  constructor() {
    super([]);
  }

  override patchValue(categories: Category[]): void {
    this.clear();
    categories.forEach(category => {
      const form = new CategoryFormGroup();
      form.patchValue(category);
      this.controls.push(form);
    });
  }
}
