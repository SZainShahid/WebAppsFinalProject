import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRegComponent } from './menu-reg.component';

describe('MenuRegComponent', () => {
  let component: MenuRegComponent;
  let fixture: ComponentFixture<MenuRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
