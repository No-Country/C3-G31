import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroEmpresaComponent } from './modal-registro-empresa.component';

describe('ModalRegistroEmpresaComponent', () => {
  let component: ModalRegistroEmpresaComponent;
  let fixture: ComponentFixture<ModalRegistroEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
