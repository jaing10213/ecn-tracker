import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcnNewReactComponent } from './ecn-new-react.component';

describe('EcnNewReactComponent', () => {
  let component: EcnNewReactComponent;
  let fixture: ComponentFixture<EcnNewReactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcnNewReactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcnNewReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
