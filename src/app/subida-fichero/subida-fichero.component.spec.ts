import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubidaFicheroComponent } from './subida-fichero.component';

describe('SubidaFicheroComponent', () => {
  let component: SubidaFicheroComponent;
  let fixture: ComponentFixture<SubidaFicheroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubidaFicheroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubidaFicheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
