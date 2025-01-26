import { Component } from '@angular/core';
import { MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {LeftSidenavComponent} from './left-sidenav/left-sidenav.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {
  faFolderClosed,
  faMapLocationDot,
  faUserCircle, faUserLock
} from '@fortawesome/free-solid-svg-icons';
import {RightSidenavComponent} from './right-sidenav/right-sidenav.component';
import {
  CdkMenu,
  CdkMenuItem,
  CdkMenuTrigger,
} from '@angular/cdk/menu';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-admin',
  imports: [
    MatSidenavModule,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatTooltip,
    LeftSidenavComponent,

    RouterOutlet,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    RightSidenavComponent,
    MatCardModule,
    FaIconComponent,
    RouterLink,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  protected readonly faMapLocationDot = faMapLocationDot;
  protected readonly faUserCircle = faUserCircle;


  protected readonly faFolderClosed = faFolderClosed;
  protected readonly faUserLock = faUserLock;
}
