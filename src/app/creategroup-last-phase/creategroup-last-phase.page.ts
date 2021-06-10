import { FirebaseService } from './../services/firebase.service';
import { Router } from '@angular/router';
import {
  tchat,
  InfoDiscussionService,
} from './../services/info-discussion.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ionic4EmojiPickerComponent } from 'ionic4-emoji-picker';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-creategroup-last-phase',
  templateUrl: './creategroup-last-phase.page.html',
  styleUrls: ['./creategroup-last-phase.page.scss'],
})
export class CreategroupLastPhasePage implements OnInit {
  @ViewChild('userInput') userInputViewChild: ElementRef;
  public userInputElement: HTMLInputElement;

  public groupName = '';
  public member = [];
  public memberName = [];
  public memberId = [];
  public image = undefined;
  public infoUser;
  public dataImage = undefined;
  isImageThere: boolean = false;
  constructor(
    private serviceTchat: InfoDiscussionService,
    public serviceAuth: FirebaseService,
    private router: Router,
    private modalCtrl: ModalController,
    private serviceNotification: NotificationService
  ) {}

  ngOnInit() {
    this.member = JSON.parse(localStorage.getItem('userofGroup'));
    this.infoUser = JSON.parse(localStorage.getItem('infoUserInDB'));
  }
  ngAfterViewInit() {
    this.userInputElement = this.userInputViewChild.nativeElement;
  }

  createGroup = () => {
    const id = Math.random().toString(36).substr(2, 9);
    this.memberId = [];
    this.memberId.push({
      id: this.infoUser.id,
      nom: this.infoUser.nom,
      role: 'admin',
    });

    const pathOfDefaultImage = `groupImage/defaultImage.png`;

    this.member.forEach((element) => {
      this.memberId.push({
        id: element.id,
        nom: element.nom,
        role: 'user',
      });
    });

    let tchatGroup = {
      id: id,
      nom: [this.groupName],
      photo: [pathOfDefaultImage],
      users: this.memberId,
      messages: [],
      seeForAll: false,
    };

    if (this.groupName.localeCompare('') == 0)
      console.log(
        `  Veuillez donner un sujet au groupe et éventuellement, une icone de groupe`
      );
    else if (this.dataImage == undefined && this.groupName != '') {
      this.serviceNotification.loadingController(5000);
      this.serviceTchat
        .saveTchatInDB(tchatGroup.id)
        .set(tchatGroup)
        .then(() => {
          this.router.navigate(['conversationgroupe', tchatGroup.id]);
          localStorage.setItem('groupOfTchat', JSON.stringify(tchatGroup));
        })
        .catch((err) => console.log(err));
    } else if (
      this.dataImage !== undefined &&
      this.dataImage != 0 &&
      this.groupName != ''
    ) {
      this.serviceNotification.loadingController(5000);
      const pathFile = `groupImage/uid${id}_${this.dataImage.name}`;
      tchatGroup = {
        id: id,
        nom: [this.groupName],
        photo: [pathFile],
        users: this.memberId,
        messages: [],
        seeForAll: false,
      };
      this.serviceAuth.uploadImage(this.dataImage, pathFile).then(() => {
        this.serviceTchat
          .saveTchatInDB(tchatGroup.id)
          .set(tchatGroup)
          .then(() => {
            this.router.navigate(['conversationgroupe', tchatGroup.id]);
            localStorage.setItem('groupOfTchat', JSON.stringify(tchatGroup));
          })
          .catch((err) => console.log(err));
      });
    }
  };

  async loadImageActionSheet1(event) {
    this.userInputElement.click();
  }

  loadImageFromDevice1(e) {
    this.dataImage = this.serviceAuth.getAndVerifyFile(e.target.files);

    const reader = new FileReader();
    this.isImageThere = true;

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => (this.image = reader.result as string);
    }
  }

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
        this.groupName += event.data.data;
      }
    });
  }
}
