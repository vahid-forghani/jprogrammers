import { FormControl, FormGroup } from "@angular/forms";
import { Category } from "../domain/Category";
import { CategoryForm } from "./CategoryForm";

export class CategoryFormGroup extends FormGroup<CategoryForm> {
  constructor() {
    super({
      _id: new FormControl<string>('', {nonNullable: true}),
      name: new FormControl<string>('', {nonNullable: true}),
      edit: new FormControl<boolean>(false, {nonNullable: true})
    })
  }

  toResource(): Category {
    return {
      _id: this.controls._id.value,
      name: this.controls.name.value
    };
  }
}
