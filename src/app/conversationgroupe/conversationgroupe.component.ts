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
  tchatGroup,
} from '../services/info-discussion.service';

@Component({
  selector: 'app-conversationgroupe',
  templateUrl: './conversationgroupe.component.html',
  styleUrls: ['./conversationgroupe.component.scss'],
})
export class ConversationgroupeComponent implements OnInit {
  public idTchat;
  public infoUserInDB;
  public groupOfTchat: tchatGroup;
  public allMessages: any = [];
  public textMessage: any;
  public isMessageRead = false;

  public showInput;
  public photo;
  public grade;
  public nom;
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
    this.activateRoute.params.subscribe((params) => (this.idTchat = params.id));
    this.groupOfTchat = JSON.parse(localStorage.getItem('GROUP_OF_TCHAT'));
    this.infoService
      .getAllTchats()
      .doc(this.idTchat)
      .snapshotChanges()
      .subscribe((res) => {
        this.groupOfTchat.nom = res.payload.get('nom');
        this.groupOfTchat.photo = res.payload.get('photo');
        this.groupOfTchat.grade = res.payload.get('grade');
        this.groupOfTchat.seeForAll = res.payload.get('seeForAll');
        this.allMessages = res.payload.get('messages');
      });
  }

  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };

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
      componentProps: {
        groupData: this.groupOfTchat,
      },
      cssClass: 'my-custom-class',
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
}
