import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { randomDelay, randomImage } from '../../shared/utils';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  readonly #localStorageKey = 'favorites';
  readonly #maxDelay = 300;
  readonly #minDelay = 200;

  #storeService = inject(StoreService); 

  getRandomPhotos(count: number = 25): Observable<string[]> {
    const photos: string[] = [];
    for (let i = 0; i < count; i++) {
      photos.push(randomImage());
    }
    return of(photos).pipe(delay(randomDelay(this.#minDelay, this.#maxDelay)));
  }

  addToFavorites(photo: string): Observable<void> {
    return of(null).pipe(
      delay(randomDelay(this.#minDelay, this.#maxDelay)),
      map(() => {
        const favorites = this.#storeService.get<string[]>(this.#localStorageKey, []);
        if (!favorites.includes(photo)) {
          favorites.push(photo);
          this.#storeService.set(this.#localStorageKey, favorites);
        }
      })
    );
  }

  getFavorites(): Observable<string[]> {
    return of(null).pipe(
      delay(randomDelay(this.#minDelay, this.#maxDelay)),
      map(() => this.#storeService.get<string[]>(this.#localStorageKey, []))
    );
  }

  removeFromFavorites(photo: string): Observable<void> {
    return of(null).pipe(
      delay(randomDelay(this.#minDelay, this.#maxDelay)),
      map(() => {
        const favorites = this.#storeService.get<string[]>(this.#localStorageKey, []).filter(fav => fav !== photo);
        this.#storeService.set(this.#localStorageKey, favorites);
      })
    );
  }
}
