import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPresentationComponent } from './cv-presentation.component';

describe('CvPresentationComponent', () => {
  let component: CvPresentationComponent;
  let fixture: ComponentFixture<CvPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
