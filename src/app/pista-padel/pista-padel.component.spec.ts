import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PistaPadelComponent } from './pista-padel.component';

describe('PistaPadelComponent', () => {
  let component: PistaPadelComponent;
  let fixture: ComponentFixture<PistaPadelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PistaPadelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PistaPadelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
