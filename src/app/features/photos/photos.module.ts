import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '../../shared/components/shared.module';
import { PhotosRoutingModule } from './photos-routing.module';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { PhotoListComponent } from './photo-list/photo-list.component';

@NgModule({
  declarations: [
    PhotoDetailsComponent,
    PhotoListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSnackBarModule,
    MatButtonModule,
    PhotosRoutingModule
  ]
})
export class PhotosModule { }
