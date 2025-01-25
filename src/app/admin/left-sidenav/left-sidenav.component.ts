import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faFileAlt, faFileArrowDown, faFolder, faHouse, faInbox, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-left-sidenav',
  imports: [
    MatIcon,
    FaIconComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './left-sidenav.component.html',
  styleUrl: './left-sidenav.component.css'
})
export class LeftSidenavComponent {

  protected readonly faInbox = faInbox;
  protected readonly faPaperPlane = faPaperPlane;
  protected readonly faFileAlt = faFileAlt;
  protected readonly faFileArrowDown = faFileArrowDown;
  protected readonly faFolder = faFolder;
  protected readonly faHouse = faHouse;
}
