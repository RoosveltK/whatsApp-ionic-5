import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tchat',
        loadChildren: () =>
          import('../tchat/tchat.module').then((m) => m.TchatPageModule),
      },
      {
        path: 'status',
        loadChildren: () =>
          import('../status/status.module').then((m) => m.StatusPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
