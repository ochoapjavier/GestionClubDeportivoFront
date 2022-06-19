import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReservaComponent } from './form-reserva.component';

describe('FormReservaComponent', () => {
  let component: FormReservaComponent;
  let fixture: ComponentFixture<FormReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
