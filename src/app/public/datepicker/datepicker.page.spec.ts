import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatepickerPage } from './datepicker.page';

describe('DatepickerPage', () => {
  let component: DatepickerPage;
  let fixture: ComponentFixture<DatepickerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
