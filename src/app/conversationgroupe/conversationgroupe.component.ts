import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverGroupeComponent } from '../components/popover/popover-groupe/popover-groupe.component';

import { FirebaseService } from '../services/firebase.service';
import {
  InfoDiscussionService,
  Message,
} from '../services/info-discussion.service';

@Component({
  selector: 'app-conversationgroupe',
  templateUrl: './conversationgroupe.component.html',
  styleUrls: ['./conversationgroupe.component.scss'],
})
export class ConversationgroupeComponent implements OnInit {
  public idTchat;
  public infoUserInDB;
  public groupOfTchat;
  public allMessages: any = [];
  public textMessage: any;
  public isMessageRead = false;
  constructor(
    public activateRoute: ActivatedRoute,
    public infoService: InfoDiscussionService,
    public serviceFireBase: FirebaseService,
    public router: Router,
    public databasFire: AngularFirestore,
    public afStorage: AngularFireStorage,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.infoUserInDB = this.infoService.getActifUser();
    this.getInfoOfTchat();

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

  getInfoOfTchat = () =>
    (this.groupOfTchat = JSON.parse(localStorage.getItem('GROUP_OF_TCHAT')));

  sendMessage = () => {
    const infoMessage: Message = {
      uidSend: this.infoUserInDB.id,
      messagetext: this.textMessage,
      date: new Date(),
      heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
      assets: '',
      read: false,
    };
    this.allMessages.push(infoMessage);
    console.log(this.allMessages);

    this.infoService
      .getAllTchats()
      .doc(this.idTchat)
      .update({ messages: this.allMessages });

    this.textMessage = '';
  };

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverGroupeComponent,
      cssClass: 'my-custom-class',
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
}
