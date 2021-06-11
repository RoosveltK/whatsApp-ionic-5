import { ConversationgroupeComponent } from './conversationgroupe/conversationgroupe.component';
import { ConversationComponent } from './conversation/conversation.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'conversation/:id',
    component: ConversationComponent,
  },
  {
    path: 'conversationgroupe/:id',
    component: ConversationgroupeComponent,
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./signin/signin.module').then((m) => m.SigninPageModule),
  },
  {
    path: 'newdisc',
    loadChildren: () =>
      import('./newdisc/newdisc.module').then((m) => m.NewdiscPageModule),
  },
  {
    path: 'creategroup',
    loadChildren: () =>
      import('./creategroup/creategroup.module').then(
        (m) => m.CreategroupPageModule
      ),
  },
  {
    path: 'parametre',
    loadChildren: () =>
      import('./parametre/parametre.module').then((m) => m.ParametrePageModule),
  },
  {
    path: 'qrcode',
    loadChildren: () =>
      import('./qrcode/qrcode.module').then((m) => m.QrcodePageModule),
  },
  {
    path: 'creategroup-last-phase',
    loadChildren: () =>
      import('./creategroup-last-phase/creategroup-last-phase.module').then(
        (m) => m.CreategroupLastPhasePageModule
      ),
  },
  {
    path: 'infogroupe',
    loadChildren: () => import('./infogroupe/infogroupe.module').then( m => m.InfogroupePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
