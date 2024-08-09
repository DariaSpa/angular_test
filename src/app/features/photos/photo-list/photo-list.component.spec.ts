import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { PhotoListComponent } from './photo-list.component';
import { PhotoService } from '../../../core/services/photo.service';
import { ImageGridComponent } from '../../../shared/components/image-grid/image-grid.component';
import { ImageCardComponent } from '../../../shared/components/image-card/image-card.component';

describe('PhotoListComponent', () => {
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;
  let photoService: jasmine.SpyObj<PhotoService>;

  beforeEach(async () => {
    const photoServiceSpy = jasmine.createSpyObj('PhotoService', ['getRandomPhotos', 'addToFavorites']);

    await TestBed.configureTestingModule({
      declarations: [PhotoListComponent, ImageGridComponent, ImageCardComponent],
      imports: [MatSnackBarModule, MatCardModule, MatIconModule],
      providers: [{ provide: PhotoService, useValue: photoServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    photoService = TestBed.inject(PhotoService) as jasmine.SpyObj<PhotoService>;

    photoService.getRandomPhotos.and.returnValue(of(['photo1', 'photo2']));
    photoService.addToFavorites.and.returnValue(of());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add photo to favorites on button click', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const photoToAdd = 'photo1';
    const buttonElement = fixture.debugElement.query(By.css(`[data-testid="image-card-${photoToAdd}"]`));

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(photoService.addToFavorites).toHaveBeenCalledWith(photoToAdd);
  });
});
