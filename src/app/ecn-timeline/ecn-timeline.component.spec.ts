import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcnTimelineComponent } from './ecn-timeline.component';

describe('EcnTimelineComponent', () => {
  let component: EcnTimelineComponent;
  let fixture: ComponentFixture<EcnTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcnTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcnTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
