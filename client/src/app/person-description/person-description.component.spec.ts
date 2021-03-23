import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDescriptionComponent } from './person-description.component';

describe('PersonDescriptionComponent', () => {
  let component: PersonDescriptionComponent;
  let fixture: ComponentFixture<PersonDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
