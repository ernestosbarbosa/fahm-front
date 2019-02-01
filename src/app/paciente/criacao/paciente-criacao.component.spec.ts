import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteCriacaoComponent } from './paciente-criacao.component';

describe('PacienteCriacaoComponent', () => {
  let component: PacienteCriacaoComponent;
  let fixture: ComponentFixture<PacienteCriacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteCriacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteCriacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
