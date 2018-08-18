import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployerRegistrationComponent } from './modal-employer-registration.component';

describe('ModalEmployerRegistrationComponent', () => {
  let component: ModalEmployerRegistrationComponent;
  let fixture: ComponentFixture<ModalEmployerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmployerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmployerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
