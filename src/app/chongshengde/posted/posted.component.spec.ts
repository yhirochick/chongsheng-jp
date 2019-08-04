import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostedComponent } from './posted.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatBadgeModule } from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

describe('PostedComponent', () => {
  let component: PostedComponent;
  let fixture: ComponentFixture<PostedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ PostedComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        
        MatBadgeModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
