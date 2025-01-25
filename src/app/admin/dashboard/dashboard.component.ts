import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {
  faChartArea, faExclamationTriangle,
  faFileArrowDown,
  faFileLines, faFolder,
  faFolderOpen,
  faMapLocationDot
} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    FaIconComponent,
    CdkDropList, CdkDrag
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  protected readonly faFileArrowDown = faFileArrowDown;

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  protected readonly faMapLocationDot = faMapLocationDot;
  protected readonly faChartArea = faChartArea;
  protected readonly faFolderOpen = faFolderOpen;
  protected readonly faFileLines = faFileLines;
  protected readonly faExclamationTriangle = faExclamationTriangle;
  protected readonly faFolder = faFolder;
}
