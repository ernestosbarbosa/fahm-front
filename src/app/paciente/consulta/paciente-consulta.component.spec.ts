import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteConsultaComponent } from './paciente-consulta.component';

describe('PacienteConsultaComponent', () => {
  let component: PacienteConsultaComponent;
  let fixture: ComponentFixture<PacienteConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
