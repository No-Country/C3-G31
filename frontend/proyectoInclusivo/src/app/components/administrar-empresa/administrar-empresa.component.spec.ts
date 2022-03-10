import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarEmpresaComponent } from './administrar-empresa.component';

describe('AdministrarEmpresaComponent', () => {
  let component: AdministrarEmpresaComponent;
  let fixture: ComponentFixture<AdministrarEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrarEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
