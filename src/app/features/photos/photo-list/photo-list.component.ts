import { Component, DestroyRef, HostListener, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PhotoService } from '../../../core/services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent {
  photos: string[] = [];
  isLoading: boolean = false;

  #snackBar = inject(MatSnackBar);
  #photoService = inject(PhotoService);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadPhotos();
  }
  
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadPhotos();
    }
  }

  loadPhotos(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    this.#photoService.getRandomPhotos().pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe({
      next: (newPhotos) => {
        this.photos.push(...newPhotos);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  addToFavorites(photo: string): void {
    this.#photoService.addToFavorites(photo).pipe(
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe({
      next: () => {
        this.#snackBar.open('Added to favorites', 'Close', {
          duration: 2000,
        });
      },
      error: (err) => {
        this.#snackBar.open('Failed to add to favorites', 'Close', {
          duration: 2000,
        });
        console.error('Failed to add photo to favorites:', err);
      }
    });
  }
}
