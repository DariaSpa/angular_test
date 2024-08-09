import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header.component';
import { APP_TITLE, MENU_ITEMS } from '../../../shared/constants';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatButtonModule
      ],
      providers: [
        { provide: APP_TITLE, useValue: APP_TITLE },
        { provide: MENU_ITEMS, useValue: MENU_ITEMS }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the app title', () => {
    const logoElement = fixture.debugElement.query(By.css('.logo')).nativeElement;
    expect(logoElement.textContent.trim()).toBe(APP_TITLE);
  });

  it('should render menu items based on the MENU_ITEMS', () => {
    const menuButtons = fixture.debugElement.queryAll(By.css('.menu-item'));
    expect(menuButtons.length).toBe(MENU_ITEMS.length);

    menuButtons.forEach((button, index) => {
      expect(button.nativeElement.textContent.trim()).toBe(MENU_ITEMS[index].label);
      expect(button.attributes['ng-reflect-router-link']).toBe(MENU_ITEMS[index].route);
    });
  });
});
