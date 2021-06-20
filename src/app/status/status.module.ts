import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusPage } from './status.page';

import { StatusPageRoutingModule } from './status-routing.module';
import { ModalStatutComponent } from '../components/modal/modal-statut/modal-statut.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, StatusPageRoutingModule],
  declarations: [StatusPage, ModalStatutComponent],
})
export class StatusPageModule {}
