import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewdiscPage } from './newdisc.page';

const routes: Routes = [
  {
    path: '',
    component: NewdiscPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewdiscPageRoutingModule {}
