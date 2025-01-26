import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {faBuilding, faUserLock, faUserPlus, faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-manager-left-panel',
    imports: [
        FaIconComponent,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './user-manager-left-panel.component.html',
  styleUrl: './user-manager-left-panel.component.css'
})
export class UserManagerLeftPanelComponent {

  protected readonly faUserPlus = faUserPlus;
  protected readonly faUsers = faUsers;
  protected readonly faBuilding = faBuilding;
  protected readonly faUserLock = faUserLock;
}
