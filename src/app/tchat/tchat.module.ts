import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TchatPage } from './tchat.page';
import { TchatPageRoutingModule } from './tchat-routing.module';
import { DiscussionComponent } from '../discussion/discussion.component';
import { ModalSendComponent } from '../components/modal/modal-send/modal-send.component';
import { ModalInfoGroupeComponent } from '../components/modal/modal-info-groupe/modal-info-groupe.component';
import { ConversationgroupeComponent } from '../conversationgroupe/conversationgroupe.component';
import { ModalListeAssetsComponent } from '../components/modal/modal-liste-assets/modal-liste-assets.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TchatPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    TchatPage,
    DiscussionComponent,
    ModalSendComponent,
    ModalInfoGroupeComponent,
    ConversationgroupeComponent,
    ModalListeAssetsComponent,
  ],
})
export class TchatPageModule {}
