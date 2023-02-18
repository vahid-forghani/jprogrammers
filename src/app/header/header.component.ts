import { Component } from '@angular/core';
import { Category } from '../domain/Category';
import { HeaderService } from '../service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  categories: Category[] = [];

  constructor(private headerService: HeaderService) {
    headerService.getCategories().subscribe(categories => this.categories = categories);
  }

}
