import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvChooseViewComponent } from './cv-choose-view.component';

describe('CvChooseViewComponent', () => {
  let component: CvChooseViewComponent;
  let fixture: ComponentFixture<CvChooseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvChooseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvChooseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
