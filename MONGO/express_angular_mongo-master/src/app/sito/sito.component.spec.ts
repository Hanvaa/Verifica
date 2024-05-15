import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitoComponent } from './sito.component';

describe('SitoComponent', () => {
  let component: SitoComponent;
  let fixture: ComponentFixture<SitoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SitoComponent]
    });
    fixture = TestBed.createComponent(SitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
