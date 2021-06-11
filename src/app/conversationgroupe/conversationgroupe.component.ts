import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverGroupeComponent } from '../popover-groupe/popover-groupe.component';
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
  public userInfo;
  public dateConnect;
  public infoUserInDB;
  public groupOfTchat = JSON.parse(localStorage.getItem('groupOfTchat'));
  public allMessages: any = [];
  public textMessage: any;
  public isMessageRead = false;
  public image;
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
    this.infoUserInDB = JSON.parse(localStorage.getItem('infoUserInDB'));

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

  getInfoOfTchat = async () =>
    (this.groupOfTchat = JSON.parse(localStorage.getItem('groupOfTchat')));

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
