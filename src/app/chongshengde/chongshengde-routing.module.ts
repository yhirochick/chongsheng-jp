import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChongshengdeComponent } from './chongshengde.component';


const routes: Routes = [
    { path: '', component: ChongshengdeComponent,
        children:[
            // { path: 'post', component: },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChongshengdeRoutingModule { }