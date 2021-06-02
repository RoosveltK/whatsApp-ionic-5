import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TchatPage } from './tchat.page';
import { TchatPageRoutingModule } from './tchat-routing.module';
import { DiscussionComponent } from '../discussion/discussion.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TchatPageRoutingModule],
  declarations: [TchatPage, DiscussionComponent],
})
export class TchatPageModule {}
