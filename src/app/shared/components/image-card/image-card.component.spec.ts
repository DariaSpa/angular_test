import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ImageCardComponent } from './image-card.component';

describe('ImageCardComponent', () => {
  let component: ImageCardComponent;
  let fixture: ComponentFixture<ImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageCardComponent],
      imports: [MatIconModule, MatCardModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct image and icon', () => {
    component.url = 'photo1';
    component.icon = 'favorite';
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    const iconElement = fixture.debugElement.query(By.css('mat-icon')).nativeElement;

    expect(imgElement.src).toContain('photo1');
    expect(iconElement.textContent.trim()).toBe('favorite');
  });

  it('should emit imageClick event on click', () => {
    spyOn(component.imageClick, 'emit');

    const cardElement = fixture.debugElement.query(By.css('.image-card'));
    cardElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.imageClick.emit).toHaveBeenCalled();
  });
});
