import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreategroupPageRoutingModule } from './creategroup-routing.module';

import { CreategroupPage } from './creategroup.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreategroupPageRoutingModule,
    TranslateModule,
  ],
  declarations: [CreategroupPage],
})
export class CreategroupPageModule {}
