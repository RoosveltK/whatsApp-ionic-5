import { AngularFireAuth } from '@angular/fire/auth';
import {
  InfoDiscussionService,
  Message,
  tchat,
} from './../services/info-discussion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { Ionic4EmojiPickerComponent } from 'ionic4-emoji-picker';
import { PopoverConversationComponent } from '../components/popover/popover-conversation/popover-conversation.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  public idTchat;
  public userStatus = false;
  public secondStatus;
  public userInfo;
  public dateConnect;
  public userOfTChat;
  public allMessages: any = [];
  public textMessage: any = '';
  public isMessageRead = false;

  constructor(
    public activateRoute: ActivatedRoute,
    public infoService: InfoDiscussionService,
    public serviceFireBase: FirebaseService,
    public router: Router,
    public databasFire: AngularFirestore,
    private modalCtrl: ModalController,
    public popoverController: PopoverController
  ) {
    // this.serviceFireBase.verificationAuthUser((user) => {
    //   if (user) {
    //     localStorage.setItem('userMetaData', JSON.stringify(user.metadata));
    //     this.userStatus = true;
    //   } else {
    //     var getStorage = JSON.parse(localStorage.getItem('userMetaData'));
    //     const date = new Date(getStorage.lastSignInTime);
    //     if (date == new Date()) {
    //       this.dateConnect = `${date.getHours()}:${date.getMinutes()}`;
    //       this.secondStatus = true;
    //     } else {
    //       this.dateConnect = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    //       this.secondStatus = false;
    //     }
    //   }
    // });
    // this.isMessageRead = true;
  }

  ngOnInit() {
    this.userInfo = this.infoService.getActifUser();

    //Reception des infos du tchat
    this.activateRoute.params.subscribe((params) => (this.idTchat = params.id));
    this.infoService
      .getAllTchats()
      .doc(this.idTchat)
      .snapshotChanges()
      .subscribe((res) => (this.allMessages = res.payload.get('messages')));
  }

  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };

  sendMessage = () => {
    const infoMessage: Message = {
      uidSend: this.userInfo.uid,
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

  async openEmojiPicker() {
    const modal = await this.modalCtrl.create({
      component: Ionic4EmojiPickerComponent,
      showBackdrop: true,
      componentProps: {
        isInModal: true,
      },
    });

    modal.present();
    modal.onDidDismiss().then((event) => {
      if (event != undefined && event.data != undefined) {
        this.textMessage += event.data.data;
      }
    });
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverConversationComponent,
      cssClass: 'my-custom-class',
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
}
