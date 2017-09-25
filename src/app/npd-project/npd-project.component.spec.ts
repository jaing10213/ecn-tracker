import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpdProjectComponent } from './npd-project.component';

describe('NpdProjectComponent', () => {
  let component: NpdProjectComponent;
  let fixture: ComponentFixture<NpdProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpdProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpdProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
