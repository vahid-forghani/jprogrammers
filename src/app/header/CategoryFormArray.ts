import { FormArray } from "@angular/forms";
import { Category } from "../domain/Category";
import { CategoryForm } from "./CategoryForm";
import { CategoryFormGroup } from "./CategoryFormGroup";

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
