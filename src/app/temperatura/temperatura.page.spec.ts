import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemperaturaPage } from './temperatura.page';

describe('TemperaturaPage', () => {
  let component: TemperaturaPage;
  let fixture: ComponentFixture<TemperaturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
