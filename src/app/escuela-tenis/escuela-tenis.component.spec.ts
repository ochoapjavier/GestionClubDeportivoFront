import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaTenisComponent } from './escuela-tenis.component';

describe('EscuelaTenisComponent', () => {
  let component: EscuelaTenisComponent;
  let fixture: ComponentFixture<EscuelaTenisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscuelaTenisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscuelaTenisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
