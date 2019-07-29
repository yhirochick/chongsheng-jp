import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChongshengdeComponent } from './chongshengde.component';

import { ChongshengdeRoutingModule } from './chongshengde-routing.module';
import { PostedComponent } from './posted/posted.component';
import { PostFormComponent } from './post-form/post-form.component';
import { InfoComponent } from './info/info.component';
import { ImageComponent } from './image/image.component';
import { DescriptionComponent } from './description/description.component';
import { MaterialModule } from '../material.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginFirebaseUIComponent } from '../login-firebase-ui/login-firebase-ui.component';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  autoUpgradeAnonymousUsers: false, // 匿名認証ユーザー自動アップグレード
  signInFlow: 'redirect', // redirect or popup
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'aaa',
  // privacyPolicyUrl: 'プライバシーポリシーのURL',
  // signInSuccessUrl: 'https://google.com',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
  siteName: 'my-app', 
};

@NgModule({
  imports: [
    CommonModule,
    ChongshengdeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  declarations: [
    ChongshengdeComponent,
    PostedComponent,
    PostFormComponent,
    InfoComponent,
    ImageComponent,
    DescriptionComponent,
    LoginFirebaseUIComponent
  ]
})
export class ChongshengdeModule { }