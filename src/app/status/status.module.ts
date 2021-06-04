import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusPage } from './status.page';

import { StatusPageRoutingModule } from './status-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, StatusPageRoutingModule],
  declarations: [StatusPage],
})
export class StatusPageModule {}
