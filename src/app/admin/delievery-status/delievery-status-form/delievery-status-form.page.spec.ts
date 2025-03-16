import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DelieveryStatusFormPage } from './delievery-status-form.page';

describe('DelieveryStatusFormPage', () => {
  let component: DelieveryStatusFormPage;
  let fixture: ComponentFixture<DelieveryStatusFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DelieveryStatusFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
