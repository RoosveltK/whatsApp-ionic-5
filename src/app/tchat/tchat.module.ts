import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TchatPage } from './tchat.page';
import { TchatPageRoutingModule } from './tchat-routing.module';
import { DiscussionComponent } from '../discussion/discussion.component';
import { ModalSendComponent } from '../components/modal/modal-send/modal-send.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TchatPageRoutingModule],
  declarations: [TchatPage, DiscussionComponent, ModalSendComponent],
})
export class TchatPageModule {}
