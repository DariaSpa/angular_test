import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteListComponent } from './favorite-list.component';
import { PhotoService } from '../../../core/services/photo.service';
import { ImageGridComponent } from '../../../shared/components/image-grid/image-grid.component';
import { ImageCardComponent } from '../../../shared/components/image-card/image-card.component';

describe('FavoriteListComponent', () => {
  let component: FavoriteListComponent;
  let fixture: ComponentFixture<FavoriteListComponent>;
  let photoService: jasmine.SpyObj<PhotoService>;

  beforeEach(async () => {
    const photoServiceSpy = jasmine.createSpyObj('PhotoService', ['getFavorites', 'removeFromFavorites']);

    await TestBed.configureTestingModule({
      declarations: [FavoriteListComponent, ImageGridComponent, ImageCardComponent],
      imports: [RouterTestingModule, MatCardModule, MatIconModule],
      providers: [{ provide: PhotoService, useValue: photoServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteListComponent);
    component = fixture.componentInstance;
    photoService = TestBed.inject(PhotoService) as jasmine.SpyObj<PhotoService>;

    photoService.getFavorites.and.returnValue(of(['photo1', 'photo2']));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load favorites on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.favorites.length).toBe(2);
    expect(component.isLoading).toBeFalse();
  });
});
