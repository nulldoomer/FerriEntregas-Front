import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTimeModalPage } from './date-time-modal.page';

describe('DateTimeModalPage', () => {
  let component: DateTimeModalPage;
  let fixture: ComponentFixture<DateTimeModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
