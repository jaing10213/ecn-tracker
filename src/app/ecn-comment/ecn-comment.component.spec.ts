import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcnCommentComponent } from './ecn-comment.component';

describe('EcnCommentComponent', () => {
  let component: EcnCommentComponent;
  let fixture: ComponentFixture<EcnCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcnCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcnCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
