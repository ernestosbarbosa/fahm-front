import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteEdicaoComponent } from './paciente-edicao.component';

describe('PacienteEdicaoComponent', () => {
  let component: PacienteEdicaoComponent;
  let fixture: ComponentFixture<PacienteEdicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteEdicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
