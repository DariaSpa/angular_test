import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { EmptyListComponent } from './empty-list.component';

describe('EmptyListComponent', () => {
  let component: EmptyListComponent;
  let fixture: ComponentFixture<EmptyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyListComponent],
      imports: [MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display default message and icon', () => {
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    const messageElement = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(iconElement.textContent.trim()).toBe('sentiment_very_dissatisfied');
    expect(messageElement.textContent.trim()).toBe('Nothing to show here');
  });

  it('should display custom message and icon', () => {
    component.message = 'Custom message';
    component.icon = 'info';
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    const messageElement = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(iconElement.textContent.trim()).toBe('info');
    expect(messageElement.textContent.trim()).toBe('Custom message');
  });
});
