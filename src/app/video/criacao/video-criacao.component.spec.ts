import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCriacaoComponent } from './video-criacao.component';

describe('VideoCriacaoComponent', () => {
  let component: VideoCriacaoComponent;
  let fixture: ComponentFixture<VideoCriacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCriacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCriacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
