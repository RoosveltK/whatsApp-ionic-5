import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfogroupePage } from './infogroupe.page';

const routes: Routes = [
  {
    path: '',
    component: InfogroupePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfogroupePageRoutingModule {}
