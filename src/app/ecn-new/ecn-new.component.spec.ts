import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcnNewComponent } from './ecn-new.component';

describe('EcnNewComponent', () => {
  let component: EcnNewComponent;
  let fixture: ComponentFixture<EcnNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcnNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcnNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
