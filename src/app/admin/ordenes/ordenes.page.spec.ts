import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenesPage } from './ordenes.page';

describe('OrdenesPage', () => {
  let component: OrdenesPage;
  let fixture: ComponentFixture<OrdenesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
