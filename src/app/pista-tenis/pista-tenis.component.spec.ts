import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PistaTenisComponent } from './pista-tenis.component';

describe('PistaComponent', () => {
  let component: PistaTenisComponent;
  let fixture: ComponentFixture<PistaTenisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PistaTenisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PistaTenisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
