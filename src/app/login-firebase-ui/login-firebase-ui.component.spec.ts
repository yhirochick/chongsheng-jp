import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFirebaseUIComponent } from './login-firebase-ui.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('LoginFirebaseUIComponent', () => {
  let component: LoginFirebaseUIComponent;
  let fixture: ComponentFixture<LoginFirebaseUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ LoginFirebaseUIComponent ],
      imports: [
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),

      ]
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
