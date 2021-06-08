import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreategroupLastPhasePage } from './creategroup-last-phase.page';

const routes: Routes = [
  {
    path: '',
    component: CreategroupLastPhasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreategroupLastPhasePageRoutingModule {}
