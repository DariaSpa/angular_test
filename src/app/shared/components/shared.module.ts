import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCardComponent } from './image-card/image-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';

import { LoaderComponent } from './loader/loader.component';
import { ImageGridComponent } from './image-grid/image-grid.component';
import { EmptyListComponent } from './empty-list/empty-list.component';

@NgModule({
  declarations: [
    ImageCardComponent,
    LoaderComponent,
    ImageGridComponent,
    EmptyListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatRippleModule,
  ],
  exports: [
    ImageCardComponent,
    ImageGridComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
