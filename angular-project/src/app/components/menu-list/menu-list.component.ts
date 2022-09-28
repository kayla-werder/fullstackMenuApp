import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/services/menu.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit {
  menus?: Menu[];
  currentMenu: Menu = {};
  currentIndex = -1;
  title = '';

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.retrieveMenus();
  }

  retrieveMenus(): void {
    this.menuService.getAll().subscribe({
      next: (data) => {
        this.menus = data;
        console.log(data);
      },
      error: (e) => console.log(e),
    });
  }

  refreshList(): void {
    this.retrieveMenus();
    this.currentMenu = {};
    this.currentIndex = -1;
  }

  setActiveMenu(menu: Menu, index: number): void {
    this.currentMenu = menu;
    this.currentIndex = index;
  }

  removeAllMenus(): void {
    this.menuService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e),
    });
  }

  searchTitle(): void {
    this.currentMenu = {};
    this.currentIndex = -1;

    this.menuService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.menus = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
