import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMenuItemComponent } from './components/add-menu-item/add-menu-item.component';
import { MenuDetailsComponent } from './components/menu-details/menu-details.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'menus', pathMatch: 'full' },
  { path: 'menus', component: MenuListComponent },
  { path: 'menus/:id', component: MenuDetailsComponent },
  { path: 'add', component: AddMenuItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
