import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployeeRegistrationComponent } from './modal-employee-registration.component';

describe('ModalEmployeeRegistrationComponent', () => {
  let component: ModalEmployeeRegistrationComponent;
  let fixture: ComponentFixture<ModalEmployeeRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmployeeRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmployeeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
