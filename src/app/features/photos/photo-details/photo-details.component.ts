import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PhotoService } from '../../../core/services/photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent {
  photo: string = '';
  id: number;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #photoService = inject(PhotoService);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.id = parseInt(this.#route.snapshot.paramMap.get('id') || '0');
    this.loadPhoto();
  }

  loadPhoto(): void {
    this.#photoService.getFavorites().pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe({
      next: (favorites) => {
        this.photo = favorites[this.id];
      },
      error: (err) => {
        console.error('Failed to load photo:', err);
      }
    });
  }

  removeFromFavorites(): void {
    this.#photoService.removeFromFavorites(this.photo).pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe({
      next: () => {
        this.#router.navigate(['/favorites']);
      },
      error: (err) => {
        console.error('Failed to remove photo from favorites:', err);
      }
    });
  }
}
