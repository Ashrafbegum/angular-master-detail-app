import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/master',
    pathMatch: 'full'
  },
  {
    path: 'master',
    component: MasterComponent
  },
  {
    path: 'edit/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MasterComponent, DetailComponent]
