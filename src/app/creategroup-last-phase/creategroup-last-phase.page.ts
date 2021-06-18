import { LanguageService } from './../services/language.service';
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
const GROUP_OF_TCHAT = 'GROUP_OF_TCHAT';
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
  public image = undefined;
  public infoUser;
  public dataImage = undefined;
  isImageThere: boolean = false;
  constructor(
    private serviceTchat: InfoDiscussionService,
    public serviceAuth: FirebaseService,
    private router: Router,
    private modalCtrl: ModalController,
    private serviceNotification: NotificationService,
    private serviceLanguage: LanguageService
  ) {}

  ngOnInit() {
    this.member = JSON.parse(localStorage.getItem('userofGroup'));
    this.infoUser = JSON.parse(localStorage.getItem('INF0_USER_CAME_FROM_DB'));
    this.serviceLanguage.setInitialAppLanguage();
  }
  ngAfterViewInit() {
    this.userInputElement = this.userInputViewChild.nativeElement;
  }

  createGroup = () => {
    const idGroupe = Math.random().toString(36).substr(2, 9);

    let memberId = [];
    let memberGrade = [];
    let tchatGroup;

    //Ajout du user actuel dans les infos du groupe id et statut(grade)
    memberId.push(this.infoUser.id);
    memberGrade.push({
      id: this.infoUser.id,
      nom: this.infoUser.nom,
      photo: this.infoUser.photo,
      role: 'admin',
    });

    //Ajout du reste des users  dans les infos du groupe id et statut(grade)
    this.member.forEach((element) => memberId.push(element.id));

    this.member.forEach((element) => {
      memberGrade.push({
        id: element.id,
        nom: element.nom,
        photo: element.photo,
        role: 'user',
      });
    });

    const refOfDefaultImage = this.serviceAuth.createRefForImage(
      `groupImage/defaultImage.png`
    );
    if (this.dataImage == undefined && this.groupName != '') {
      this.serviceNotification.loadingController(3000);

      refOfDefaultImage.getDownloadURL().subscribe((res) => {
        tchatGroup = {
          id: idGroupe,
          nom: [this.groupName],
          photo: [res],
          users: memberId,
          messages: [],
          seeForAll: true,
          grade: memberGrade,
        };
        this.serviceTchat
          .saveTchatInDB(tchatGroup.id)
          .set(tchatGroup)
          .then(() => {
            localStorage.setItem(GROUP_OF_TCHAT, JSON.stringify(tchatGroup));
            this.router.navigate(['conversationgroupe', tchatGroup.id]);
          })
          .catch((err) => console.log(err));
        console.log(tchatGroup);
      });
    } else if (
      this.dataImage !== undefined &&
      this.dataImage != 0 &&
      this.groupName != ''
    ) {
      const pathFile = `groupImage/uid${idGroupe}_${this.dataImage.name}`;
      const pathRefFile = this.serviceAuth.createRefForImage(pathFile);

      this.serviceNotification.loadingController(3000);
      this.serviceAuth.uploadImage(this.dataImage, pathFile).then(() => {
        pathRefFile.getDownloadURL().subscribe((res) => {
          tchatGroup = {
            id: idGroupe,
            nom: [this.groupName],
            photo: [res],
            users: memberId,
            messages: [],
            seeForAll: true,
            grade: memberGrade,
          };

          this.serviceTchat
            .saveTchatInDB(tchatGroup.id)
            .set(tchatGroup)
            .then(() => {
              this.router.navigate(['conversationgroupe', tchatGroup.id]);
              localStorage.setItem(GROUP_OF_TCHAT, JSON.stringify(tchatGroup));
            })
            .catch((err) => console.log(err));
        });
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
