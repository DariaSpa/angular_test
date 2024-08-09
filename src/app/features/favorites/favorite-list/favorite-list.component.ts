import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PhotoService } from '../../../core/services/photo.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})
export class FavoriteListComponent implements OnInit {
  favorites: string[] = [];
  isLoading = true;

  #photoService = inject(PhotoService); 
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.#photoService.getFavorites().pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe({
      next: (favorites) => {
        this.favorites = favorites;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load favorites:', err);
      }
    });
  }

  viewPhoto(photo: string): void {
    const id = this.favorites.indexOf(photo);
    this.#router.navigate(['/photos', id]);
  }

  removeFromFavorites(photo: string): void {
    this.#photoService.removeFromFavorites(photo).pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe({
      next: () => {
        this.loadFavorites();
      },
      error: (err) => {
        console.error('Failed to remove photo from favorites:', err);
      }
    });
  }
}
