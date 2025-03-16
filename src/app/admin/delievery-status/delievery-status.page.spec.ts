import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DelieveryStatusPage } from './delievery-status.page';

describe('DelieveryStatusPage', () => {
  let component: DelieveryStatusPage;
  let fixture: ComponentFixture<DelieveryStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DelieveryStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
