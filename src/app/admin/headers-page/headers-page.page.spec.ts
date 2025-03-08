import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadersPagePage } from './headers-page.page';

describe('HeadersPagePage', () => {
  let component: HeadersPagePage;
  let fixture: ComponentFixture<HeadersPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
