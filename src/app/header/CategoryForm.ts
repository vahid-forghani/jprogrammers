import { FormControl } from "@angular/forms";

export interface CategoryForm {
    _id: FormControl<string>;
    name: FormControl<string>;
    edit: FormControl<boolean>;
}
