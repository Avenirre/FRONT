import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvActionsComponent } from './cv-actions.component';

describe('CvActionsComponent', () => {
  let component: CvActionsComponent;
  let fixture: ComponentFixture<CvActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
