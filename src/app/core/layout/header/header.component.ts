import { Component } from '@angular/core';
import { APP_TITLE, MENU_ITEMS } from '../../../shared/constants';
import { MenuItem } from '../../../shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  appTitle = APP_TITLE;
  menuItems = MENU_ITEMS;

  trackByMenuItem(index: number, menuItem: MenuItem): string {
    return menuItem.label;
  }
}
