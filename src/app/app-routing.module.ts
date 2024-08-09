import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'photos', pathMatch: 'full' },
      { path: 'photos', loadChildren: () => import('./features/photos/photos.module').then(m => m.PhotosModule) },
      { path: 'favorites', loadChildren: () => import('./features/favorites/favorites.module').then(m => m.FavoritesModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
