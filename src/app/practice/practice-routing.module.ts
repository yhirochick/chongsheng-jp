import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PracticeComponent } from './practice.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
  { path: '', component: PracticeComponent,
      children:[
          { path: 'rxjs', component: RxjsComponent},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticeRoutingModule { }
