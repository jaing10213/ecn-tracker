import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcnSummaryComponent } from './ecn-summary.component';

describe('EcnSummaryComponent', () => {
  let component: EcnSummaryComponent;
  let fixture: ComponentFixture<EcnSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcnSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcnSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
