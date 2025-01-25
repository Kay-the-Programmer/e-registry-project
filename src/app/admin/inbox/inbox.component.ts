import {Component, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faBuilding, faBuildingCircleArrowRight} from '@fortawesome/free-solid-svg-icons';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-inbox',
  imports: [
    MatTabsModule,
    MatCard,
    MatIcon,
    FaIconComponent,
    MatListModule,
  ],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent implements OnInit {

  ngOnInit(): void {
  }

  protected readonly faBuilding = faBuilding;
  protected readonly faBuildingCircleArrowRight = faBuildingCircleArrowRight;
}
