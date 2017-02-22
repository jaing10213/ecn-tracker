import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcnListComponent } from './ecn-list.component';

describe('EcnListComponent', () => {
  let component: EcnListComponent;
  let fixture: ComponentFixture<EcnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
