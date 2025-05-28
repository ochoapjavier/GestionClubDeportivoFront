import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaPadelComponent } from './escuela-padel.component';

describe('EscuelaPadelComponent', () => {
  let component: EscuelaPadelComponent;
  let fixture: ComponentFixture<EscuelaPadelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscuelaPadelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscuelaPadelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
