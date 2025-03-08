import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntregaInfoPage } from './entrega-info.page';

describe('EntregaInfoPage', () => {
  let component: EntregaInfoPage;
  let fixture: ComponentFixture<EntregaInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
