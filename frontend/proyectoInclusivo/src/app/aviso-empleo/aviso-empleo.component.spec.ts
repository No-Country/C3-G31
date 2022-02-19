import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoEmpleoComponent } from './aviso-empleo.component';

describe('AvisoEmpleoComponent', () => {
  let component: AvisoEmpleoComponent;
  let fixture: ComponentFixture<AvisoEmpleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoEmpleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
