import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleosActivosComponent } from './empleos-activos.component';

describe('EmpleosActivosComponent', () => {
  let component: EmpleosActivosComponent;
  let fixture: ComponentFixture<EmpleosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleosActivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
