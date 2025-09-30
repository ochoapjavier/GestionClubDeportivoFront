import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPistaPadelComponent } from './form-pista-padel.component';

describe('FormPistaPadelComponent', () => {
  let component: FormPistaPadelComponent;
  let fixture: ComponentFixture<FormPistaPadelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPistaPadelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPistaPadelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
