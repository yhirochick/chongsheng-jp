import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticeRoutingModule } from './practice-routing.module';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PracticeComponent } from './practice.component';


@NgModule({
  declarations: [RxjsComponent, PracticeComponent],
  imports: [
    CommonModule,
    PracticeRoutingModule
  ]
})
export class PracticeModule { }
