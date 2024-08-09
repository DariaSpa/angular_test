import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageGridComponent } from './image-grid.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ImageCardComponent } from '../image-card/image-card.component';
import { EmptyListComponent } from '../empty-list/empty-list.component';
import { LoaderComponent } from '../loader/loader.component';

describe('ImageGridComponent', () => {
  let component: ImageGridComponent;
  let fixture: ComponentFixture<ImageGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageGridComponent, ImageCardComponent, EmptyListComponent, LoaderComponent],
      imports: [MatIconModule, MatCardModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGridComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display images using image cards', () => {
    component.images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    fixture.detectChanges();

    const imageCards = fixture.debugElement.queryAll(By.directive(ImageCardComponent));
    expect(imageCards.length).toBe(3);
  });

  it('should display the empty list component when no images and not loading', () => {
    component.images = [];
    component.isLoading = false;
    fixture.detectChanges();

    const emptyListElement = fixture.debugElement.query(By.directive(EmptyListComponent));
    expect(emptyListElement).toBeTruthy();
  });

  it('should emit imageClick event when an image card is clicked', () => {
    spyOn(component.imageClick, 'emit');

    component.images = ['image1.jpg'];
    fixture.detectChanges();

    const imageCard = fixture.debugElement.query(By.directive(ImageCardComponent));
    imageCard.triggerEventHandler('imageClick', null);

    expect(component.imageClick.emit).toHaveBeenCalledWith('image1.jpg');
  });
});
