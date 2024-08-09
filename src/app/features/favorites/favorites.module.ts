import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { SharedModule } from '../../shared/components/shared.module';


@NgModule({
  declarations: [
    FavoriteListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
