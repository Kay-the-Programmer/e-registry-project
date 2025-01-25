import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {
  faBuilding,
  faFileArrowUp,
  faFolderPlus,
} from '@fortawesome/free-solid-svg-icons';
import {MatCard} from '@angular/material/card';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-right-sidenav',
  imports: [
    FaIconComponent,
    MatCard,
    MatToolbarModule,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './right-sidenav.component.html',
  styleUrl: './right-sidenav.component.css'
})
export class RightSidenavComponent {

  protected readonly faFolderPlus = faFolderPlus;
  protected readonly faFileArrowUp = faFileArrowUp;
  protected readonly faBuilding = faBuilding;
}
