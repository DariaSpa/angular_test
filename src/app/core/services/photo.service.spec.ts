import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service';
import { StoreService } from './store.service';

describe('PhotoService', () => {
  let service: PhotoService;
  let storeService: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotoService,
        { provide: StoreService, useValue: jasmine.createSpyObj('StoreService', ['get', 'set']) }
      ]
    });

    service = TestBed.inject(PhotoService);
    storeService = TestBed.inject(StoreService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should get random photos', (done) => {
    service.getRandomPhotos().subscribe(photos => {
      expect(photos.length).toBe(25);
      done();
    });
  });

  it('should add photo to favorites', (done) => {
    const photoUrl = 'photo1';
    const mockFavorites = [photoUrl];

    (storeService.get as jasmine.Spy).and.returnValue([]);

    service.addToFavorites(photoUrl).subscribe(() => {
      expect(storeService.set).toHaveBeenCalledWith('favorites', mockFavorites);

      service.getFavorites().subscribe(favorites => {
        expect(favorites).toContain(photoUrl);
        done();
      });
    });
  });

  it('should get favorites', (done) => {
    const mockFavorites = ['photo1', 'photo2'];
    (storeService.get as jasmine.Spy).and.returnValue(mockFavorites);

    service.getFavorites().subscribe(favorites => {
      expect(favorites).toEqual(mockFavorites);
      done();
    });
  });
});
