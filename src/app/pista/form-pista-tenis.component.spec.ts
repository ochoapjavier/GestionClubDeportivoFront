import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPistaTenisComponent } from './form-pista-tenis.component';

describe('FormPistaComponent', () => {
  let component: FormPistaTenisComponent;
  let fixture: ComponentFixture<FormPistaTenisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPistaTenisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPistaTenisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
