import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoService } from '../../../core/services/photo.service';
import { ImageCardComponent } from '../../../shared/components/image-card/image-card.component';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;
  let photoService: jasmine.SpyObj<PhotoService>;

  beforeEach(async () => {
    const photoServiceSpy = jasmine.createSpyObj('PhotoService', ['getFavorites', 'removeFromFavorites']);

    await TestBed.configureTestingModule({
      declarations: [PhotoDetailsComponent, ImageCardComponent],
      imports: [RouterTestingModule, MatCardModule, MatIconModule],
      providers: [
        { provide: PhotoService, useValue: photoServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '0' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    photoService = TestBed.inject(PhotoService) as jasmine.SpyObj<PhotoService>;

    photoService.getFavorites.and.returnValue(of(['photo1']));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load photo on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.photo).toBe('photo1');
  });

  it('should remove photo from favorites on button click', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const photoToRemove = 'photo1';
    const buttonElement = fixture.debugElement.query(By.css(`[data-testid="image-card-${photoToRemove}"]`));

    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(photoService.removeFromFavorites).toHaveBeenCalledWith(photoToRemove);
  });
});
