import { Component, OnInit, Input } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/services/menu.service';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css'],
})
export class MenuDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentMenu: Menu = {
    title: '',
    description: '',
    price: 0,
    published: false,
  };

  message = '';

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getMenu(this.route.snapshot.params['id']);
    }
  }

  getMenu(id: string): void {
    this.menuService.get(id).subscribe({
      next: (data) => {
        this.currentMenu = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentMenu.title,
      description: this.currentMenu.description,
      published: status,
    };

    this.message = '';

    this.menuService.update(this.currentMenu.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentMenu.published = status;
        this.message = res.message
          ? res.message
          : 'Published was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  updateMenu(): void {
    this.message = '';

    this.menuService.update(this.currentMenu.id, this.currentMenu).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'This menu was updated successfully!';
      },
      error: (e) => console.error(e),
    });
  }

  deleteMenu(): void {
    this.menuService.delete(this.currentMenu.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/menus']);
      },
      error: (e) => console.error(e),
    });
  }
}
