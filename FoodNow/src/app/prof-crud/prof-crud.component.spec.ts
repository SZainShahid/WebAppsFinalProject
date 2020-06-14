import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfCrudComponent } from './prof-crud.component';

describe('ProfCrudComponent', () => {
  let component: ProfCrudComponent;
  let fixture: ComponentFixture<ProfCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
