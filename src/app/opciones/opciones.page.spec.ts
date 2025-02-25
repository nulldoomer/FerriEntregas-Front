import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpcionesPage } from './opciones.page';

describe('OpcionesPage', () => {
  let component: OpcionesPage;
  let fixture: ComponentFixture<OpcionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
