import { PopoverComponent } from './../components/popover/popover/popover.component';

import {
  InfoDiscussionService,
  Message,
  tchat,
} from './../services/info-discussion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { PopoverController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { PopoverConversationComponent } from '../components/popover/popover-conversation/popover-conversation.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public idTchat;
  public userStatus = false;
  public secondStatus;
  public userInfo;
  public dateConnect;
  public userofDB = JSON.parse(localStorage.getItem('infoUserInDB'));
  public userOfTChat;
  public allMessages: any = [];
  public textMessage: any;

  constructor(
    public activateRoute: ActivatedRoute,
    public infoService: InfoDiscussionService,
    public serviceFireBase: FirebaseService,
    public router: Router,
    public databasFire: AngularFirestore,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.userInfo = this.infoService.getActifUser();
    this.serviceFireBase.verifyStateOfUser();
    this.userOfTChat = this.infoService.getUserOfTChat();

    //Reception des infos du tchat
    this.activateRoute.params.subscribe((params) => (this.idTchat = params.id));
    this.infoService
      .getAllTchats()
      .doc(this.idTchat)
      .snapshotChanges()
      .subscribe((res) => {
        this.allMessages = res.payload.get('messages');
        this.allMessages.map((element) => {
          if (element.uidSend.localeCompare(this.userInfo.id) != 0)
            element.read = true;
        });
      });
  }

  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };

  sendMessage = () => {
    const infoMessage: Message = {
      uidSend: this.userInfo.id,
      messagetext: this.textMessage,
      date: new Date(),
      heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
      assets: '',
      read: false,
    };
    this.allMessages.push(infoMessage);
    this.infoService
      .getAllTchats()
      .doc(this.idTchat)
      .update({ messages: this.allMessages });

    this.textMessage = '';
  };

  verifyDay() {}

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverConversationComponent,
      componentProps: {
        idTchat: this.idTchat,
        messages: this.allMessages,
        userId: this.userInfo.id,
      },
      cssClass: 'my-custom-class',
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      if (this.allMessages.length == 10) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
