import { PopoverComponent } from './../components/popover/popover/popover.component';
import {
  InfoDiscussionService,
  Message,
  tchat,
} from './../services/info-discussion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { PopoverController, ModalController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { PopoverConversationComponent } from '../components/popover/popover-conversation/popover-conversation.component';
import { ModalSendComponent } from '../components/modal/modal-send/modal-send.component';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('galleryInput') galleryInputViewChild: ElementRef;

  public idTchat;
  public userInfo;
  public dateLastConnect;
  public userofDB = JSON.parse(localStorage.getItem('infoUserInDB'));
  public userOfTChat;
  public allMessages: any = [];
  public textMessage = '';
  public searchText = '';
  lastConnect;
  public showEmojiPicker = false;
  show = false;
  public galleryInputElement: HTMLInputElement;

  constructor(
    public activateRoute: ActivatedRoute,
    public infoService: InfoDiscussionService,
    public serviceFireBase: FirebaseService,
    public router: Router,
    public databasFire: AngularFirestore,
    public popoverController: PopoverController,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.userInfo = this.infoService.getActifUser();
    this.userOfTChat = this.infoService.getUserOfTChat();
    this.infoService
      .getUserofTchatSubscribe()
      .doc(this.userOfTChat.id)
      .snapshotChanges()
      .subscribe((res) => {
        this.userOfTChat.statut = res.payload.get('statut');
        this.userOfTChat.lastConnect = res.payload.get('lastConnect');
        this.dateLastConnect = new Date(
          this.userOfTChat.lastConnect.seconds * 1000
        );
        this.lastConnect = new Date(
          this.userOfTChat.lastConnect.seconds * 1000
        ).toLocaleTimeString('fr-FR', {
          hour12: false,
          hour: 'numeric',
          minute: 'numeric',
        });
      });

    //Reception des infos du tchat et mise a jour
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

  verifStateUser() {
    if (this.allMessages.length != 0) {
    }
  }

  sendMessage = () => {
    const infoMessage: Message = {
      uidSend: this.userInfo.id,
      nomSend: this.userInfo.nom,
      messagetext: this.textMessage,
      date: new Date(),
      heure: new Date().toLocaleTimeString('fr-FR', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
      }),
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

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverConversationComponent,
      componentProps: {
        idTchat: this.idTchat,
        messages: this.allMessages,
        userId: this.userInfo,
      },
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
        userId: this.userInfo,
      },
    });
    return await modal.present();
  }
}
