import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DistanciaPage } from './distancia.page';

describe('DistanciaPage', () => {
  let component: DistanciaPage;
  let fixture: ComponentFixture<DistanciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DistanciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
