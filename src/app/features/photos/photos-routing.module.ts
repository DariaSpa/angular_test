import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';

const routes: Routes = [
  {
    path: '',
    component: PhotoListComponent
  },
  {
    path: ':id',
    component: PhotoDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule { }
