import {Component} from '@angular/core';
import {HeaderService} from '../service/header.service';
import {CategoryFormArray} from './category.form-array';
import {CategoryFormGroup} from './category.form-group';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  categories = new CategoryFormArray();
  editMode = false;
  categoryName = '';

  constructor(private headerService: HeaderService, private authService: AuthService) {
    this.init();
  }

  init(): void {
    this.headerService.getCategories().subscribe(categories => {
      this.categories.patchValue(categories);
    });
  }

  addNewCategory(): void {
    this.headerService.addNewCategory('').subscribe(_ => this.init());
  }

  switchEditMode(category: CategoryFormGroup): void {
    if (category.controls.edit.value){
      this.headerService.updateCategory(category.toResource()).subscribe();
    }
    category.controls.edit.setValue(!category.controls.edit.value);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logout();
  }

}
