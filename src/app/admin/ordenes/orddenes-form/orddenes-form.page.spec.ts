import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrddenesFormPage } from './orddenes-form.page';

describe('OrddenesFormPage', () => {
  let component: OrddenesFormPage;
  let fixture: ComponentFixture<OrddenesFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrddenesFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
