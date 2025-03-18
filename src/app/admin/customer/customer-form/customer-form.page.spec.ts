import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerFormPage } from './customer-form.page';

describe('CustomerFormPage', () => {
  let component: CustomerFormPage;
  let fixture: ComponentFixture<CustomerFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
