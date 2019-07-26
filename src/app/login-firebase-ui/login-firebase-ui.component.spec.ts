import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFirebaseUIComponent } from './login-firebase-ui.component';

describe('LoginFirebaseUIComponent', () => {
  let component: LoginFirebaseUIComponent;
  let fixture: ComponentFixture<LoginFirebaseUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFirebaseUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFirebaseUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
