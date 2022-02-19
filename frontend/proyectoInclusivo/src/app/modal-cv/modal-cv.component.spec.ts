import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCvComponent } from './modal-cv.component';

describe('ModalCvComponent', () => {
  let component: ModalCvComponent;
  let fixture: ComponentFixture<ModalCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
