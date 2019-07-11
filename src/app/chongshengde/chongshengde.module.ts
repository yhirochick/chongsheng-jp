import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ChongshengdeComponent } from './chongshengde.component';

import { ChongshengdeRoutingModule } from './chongshengde-routing.module';
import { PostedComponent } from './posted/posted.component';
import { PostFormComponent } from './post-form/post-form.component';
import { InfoComponent } from './info/info.component';
import { ImageComponent } from './image/image.component';
import { DescriptionComponent } from './description/description.component';



@NgModule({
  imports: [
    CommonModule,
    ChongshengdeRoutingModule,
    MatCardModule,
    MatButtonModule
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