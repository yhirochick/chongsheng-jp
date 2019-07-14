import { PostFormComponent } from './post-form/post-form.component';
import { PostedComponent } from './posted/posted.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChongshengdeComponent } from './chongshengde.component';


const routes: Routes = [
    { path: '', component: ChongshengdeComponent,
        children:[
            { path: 'post-form', component: PostFormComponent},
            { path: 'posts', component: PostedComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChongshengdeRoutingModule { }