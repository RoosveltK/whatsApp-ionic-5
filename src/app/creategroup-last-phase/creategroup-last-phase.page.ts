import { FirebaseService } from './../services/firebase.service';
import { Router } from '@angular/router';
import {
  tchat,
  InfoDiscussionService,
} from './../services/info-discussion.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ionic4EmojiPickerComponent } from 'ionic4-emoji-picker';

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
  constructor(
    private serviceTchat: InfoDiscussionService,
    public serviceAuth: FirebaseService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.member = JSON.parse(localStorage.getItem('userofGroup'));
    this.infoUser = JSON.parse(localStorage.getItem('userofDB'));
  }
  ngAfterViewInit() {
    this.userInputElement = this.userInputViewChild.nativeElement;
  }

  createGroup = () => {
    const id = Math.random().toString(36).substr(2, 9);
    this.memberName = [];
    this.memberId = [];
    this.memberName.push(this.infoUser.nom);
    this.memberId.push({
      id: this.infoUser.id,
      role: 'admin',
    });

    const pathOfDefaultImage = `groupImage/defaultImage.png`;

    this.member.forEach((element) => {
      this.memberName.push(element.nom);
    });

    this.member.forEach((element) => {
      this.memberId.push({
        id: element.id,
        role: 'user',
      });
    });

    let tchatGroup: tchat = {
      id: id,
      nom: this.memberName,
      photo: [pathOfDefaultImage],
      users: this.memberId,
      messages: [],
    };

    if (this.groupName.localeCompare('') == 0)
      console.log(
        `  Veuillez donner un sujet au groupe et éventuellement, une icone de groupe`
      );
    else if (this.image == undefined && this.groupName != '') {
      this.serviceTchat
        .saveTchatInDB(tchatGroup.id)
        .set(tchatGroup)
        .then(() => this.router.navigate(['conversation', tchatGroup.id]))
        .catch((err) => console.log(err));
    } else if (
      this.image !== undefined &&
      this.image != 0 &&
      this.groupName != ''
    ) {
      const pathFile = `groupImage/uid${id}_${this.image.name}`;

      tchatGroup = {
        id: id,
        nom: this.memberName,
        photo: [pathFile],
        users: this.memberId,
        messages: [],
      };
      this.serviceAuth.uploadImage(this.image, pathFile).then(() => {
        this.serviceTchat
          .saveTchatInDB(tchatGroup.id)
          .set(tchatGroup)
          .then(() => this.router.navigate(['conversation', tchatGroup.id]))
          .catch((err) => console.log(err));
      });
    }
  };

  async loadImageActionSheet1(event) {
    this.userInputElement.click();
  }

  loadImageFromDevice1(event) {
    this.image = this.serviceAuth.getAndVerifyFile(event);
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
