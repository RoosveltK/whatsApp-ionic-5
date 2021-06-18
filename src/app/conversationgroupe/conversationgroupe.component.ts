import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController, ModalController } from '@ionic/angular';
import { Ionic4EmojiPickerComponent } from 'ionic4-emoji-picker';
import { PopoverConversationComponent } from '../components/popover/popover-conversation/popover-conversation.component';
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
  public textMessage = '';
  public show = false;

  public searchText;
  public isAdmin = false;

  constructor(
    public activateRoute: ActivatedRoute,
    public infoService: InfoDiscussionService,
    public serviceFireBase: FirebaseService,
    public router: Router,
    public databasFire: AngularFirestore,
    public afStorage: AngularFireStorage,
    public popoverController: PopoverController,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.infoUserInDB = this.infoService.getActifUser();
    this.activateRoute.params.subscribe((params) => (this.idTchat = params.id));
    this.groupOfTchat = JSON.parse(localStorage.getItem('GROUP_OF_TCHAT'));
    this.findStatutOfUserInGroup();
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

  findStatutOfUserInGroup = () => {
    this.groupOfTchat.grade.forEach((element) => {
      if (
        this.infoUserInDB.id.localeCompare(element.id) == 0 &&
        element.role == 'admin'
      )
        this.isAdmin = true;
    });
  };

  sendMessage = () => {
    const infoMessage = {
      uidSend: this.infoUserInDB.id,
      messagetext: this.textMessage,
      date: new Date(),
      heure: new Date().toLocaleTimeString('fr-FR', { hour12: false, 
        hour: "numeric", 
        minute: "numeric"}),
      assets: '',
      read: false,
      nomSend: this.infoUserInDB.nom,
    };
    this.allMessages.push(infoMessage);
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

  async presentPopoverMsg() {
    const popover = await this.popoverController.create({
      component: PopoverConversationComponent,
      componentProps: {
        idTchat: this.idTchat,
        messages: this.allMessages,
        userId: this.infoUserInDB,
      },
      cssClass: 'my-custom-class',
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
  activeSearch = () => (this.show = !this.show);

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
}
