import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewdiscPageRoutingModule } from './newdisc-routing.module';

import { NewdiscPage } from './newdisc.page';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewdiscPageRoutingModule,
    TranslateModule,
    Ng2SearchPipeModule,
  ],
  declarations: [NewdiscPage],
})
export class NewdiscPageModule {}
