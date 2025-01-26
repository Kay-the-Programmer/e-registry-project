import { Component } from '@angular/core';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltip} from '@angular/material/tooltip';
import {faFolderClosed, faMapLocationDot, faUserCircle, faUserLock} from '@fortawesome/free-solid-svg-icons';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {RouterLink, RouterOutlet} from '@angular/router';
import {UserManagerLeftPanelComponent} from './user-manager-left-panel/user-manager-left-panel.component';

@Component({
  selector: 'app-user-manager',
  imports: [
    CdkMenu,
    CdkMenuItem,
    FaIconComponent,
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatTooltip,
    CdkMenuTrigger,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterOutlet,
    UserManagerLeftPanelComponent,
    RouterLink
  ],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent {

  protected readonly faFolderClosed = faFolderClosed;
  protected readonly faMapLocationDot = faMapLocationDot;
  protected readonly faUserLock = faUserLock;
  protected readonly faUserCircle = faUserCircle;
}
