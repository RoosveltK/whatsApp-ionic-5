import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreategroupLastPhasePageRoutingModule } from './creategroup-last-phase-routing.module';

import { CreategroupLastPhasePage } from './creategroup-last-phase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreategroupLastPhasePageRoutingModule
  ],
  declarations: [CreategroupLastPhasePage]
})
export class CreategroupLastPhasePageModule {}
