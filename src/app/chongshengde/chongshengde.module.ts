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



@NgModule({
  imports: [
    CommonModule,
    ChongshengdeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  declarations: [
    ChongshengdeComponent,
    PostedComponent,
    PostFormComponent,
    InfoComponent,
    ImageComponent,
    DescriptionComponent
  ]
})
export class ChongshengdeModule { }