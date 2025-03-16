import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatmentTypeFormPage } from './patment-type-form.page';

describe('PatmentTypeFormPage', () => {
  let component: PatmentTypeFormPage;
  let fixture: ComponentFixture<PatmentTypeFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatmentTypeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
