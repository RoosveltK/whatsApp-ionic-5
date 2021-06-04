import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewdiscPageRoutingModule } from './newdisc-routing.module';

import { NewdiscPage } from './newdisc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewdiscPageRoutingModule
  ],
  declarations: [NewdiscPage]
})
export class NewdiscPageModule {}
