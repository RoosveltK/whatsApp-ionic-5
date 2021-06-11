import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewdiscPageRoutingModule } from './newdisc-routing.module';

import { NewdiscPage } from './newdisc.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewdiscPageRoutingModule,
    TranslateModule,
  ],
  declarations: [NewdiscPage],
})
export class NewdiscPageModule {}
