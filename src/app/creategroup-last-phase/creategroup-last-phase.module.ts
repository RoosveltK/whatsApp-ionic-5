import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreategroupLastPhasePageRoutingModule } from './creategroup-last-phase-routing.module';

import { CreategroupLastPhasePage } from './creategroup-last-phase.page';
import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreategroupLastPhasePageRoutingModule,
    Ionic4EmojiPickerModule,
  ],
  declarations: [CreategroupLastPhasePage],
})
export class CreategroupLastPhasePageModule {}
