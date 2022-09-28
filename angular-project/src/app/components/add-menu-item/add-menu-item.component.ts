import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/services/menu.service';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.css'],
})
export class AddMenuItemComponent {
  menu: Menu = {
    title: '',
    description: '',
    price: 0,
    published: false,
  };
  submitted = false;

  constructor(private menuService: MenuService) {}

  saveMenu(): void {
    const data = {
      title: this.menu.title,
      description: this.menu.description,
      price: this.menu.price,
      published: this.menu.published,
    };

    this.menuService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newMenu(): void {
    this.submitted = false;
    this.menu = {
      title: '',
      description: '',
      price: 0,
      published: false,
    };
  }
}
