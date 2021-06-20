import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController, ModalController } from '@ionic/angular';
import { ModalSendComponent } from '../components/modal/modal-send/modal-send.component';
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
  @ViewChild('galleryInput') galleryInputViewChild: ElementRef;
  public idTchat;
  public infoUserInDB;
  public groupOfTchat;
  public allMessages: any = [];
  public textMessage = '';
  public show = false;

  public galleryInputElement: HTMLInputElement;
  public searchText;
  public isAdmin = false;
  public showEmojiPicker = false;
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
      heure: new Date().toLocaleTimeString('fr-FR', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
      }),
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

  addEmoji(event) {
    this.textMessage += event.data;
  }

  ngAfterViewInit() {
    this.galleryInputElement = this.galleryInputViewChild.nativeElement;
  }

  async pickGallery(event) {
    this.galleryInputElement.click();
  }

  loadGallery(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;

      this.presentModal(file);
    }
  }

  async presentModal(fic) {
    const modal = await this.modalCtrl.create({
      component: ModalSendComponent,
      componentProps: {
        imageOrVideo: fic,
        idTchat: this.idTchat,
        allMessages: this.allMessages,
        userId: this.infoUserInDB,
      },
    });
    return await modal.present();
  }
}
