import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: AboutComponent},
  { path: 'chongshengde', loadChildren: './chongshengde/chongshengde.module#ChongshengdeModule' },
  { path: 'practice', loadChildren: './practice/practice.module#PracticeModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
