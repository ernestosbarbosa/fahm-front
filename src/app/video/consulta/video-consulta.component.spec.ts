import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConsultaComponent } from './video-consulta.component';

describe('VideoConsultaComponent', () => {
  let component: VideoConsultaComponent;
  let fixture: ComponentFixture<VideoConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
