import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosFormPage } from './usuarios-form.page';

describe('UsuariosFormPage', () => {
  let component: UsuariosFormPage;
  let fixture: ComponentFixture<UsuariosFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
