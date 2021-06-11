import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfogroupePageRoutingModule } from './infogroupe-routing.module';

import { InfogroupePage } from './infogroupe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfogroupePageRoutingModule
  ],
  declarations: [InfogroupePage]
})
export class InfogroupePageModule {}
