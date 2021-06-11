import { LanguageService } from './../services/language.service';
import { NotificationService } from './../services/notification.service';
import {
  InfoDiscussionService,
  tchat,
} from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

const USER_OF_TCHAT = 'USER_OF_TCHAT';
@Component({
  selector: 'app-newdisc',
  templateUrl: './newdisc.page.html',
  styleUrls: ['./newdisc.page.scss'],
})
export class NewdiscPage implements OnInit {
  public show = false;
  public searchText;
  public users = [];

  public actifUserofDB;
  constructor(
    public router: Router,
    public service: InfoDiscussionService,
    private serviceNotification: NotificationService,
    private serviceLanguage: LanguageService
  ) {
    this.serviceLanguage.setInitialAppLanguage();
  }

  ngOnInit() {
    this.actifUserofDB = this.service.getActifUser();
    this.service.getAllUsers(this.users);
  }

  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };

  createGroup = () => {
    this.router.navigate(['/creategroup']);
  };

  showSearchBar() {
    this.show = true;
  }

  startDiscu = (userData: any) => {
    const newTchat: tchat = {
      id: `${userData.id}${this.actifUserofDB.id}`,
      nom: [userData.nom, this.actifUserofDB.nom],
      photo: [userData.photo, this.actifUserofDB.photo],
      users: [userData.id, this.actifUserofDB.id],
      messages: [],
    };
    localStorage.setItem(USER_OF_TCHAT, JSON.stringify(userData));
    const idTchat = this.service.findTChatById(
      newTchat.id,
      `${this.actifUserofDB.id}${userData.id}`
    );
    if (idTchat == null) {
      this.serviceNotification.loadingController(2000);
      this.service
        .saveTchatInDB(newTchat.id)
        .set(newTchat)
        .then(() => this.router.navigate(['conversation', newTchat.id]))
        .catch((err) => console.log(err));
    } else this.router.navigate(['conversation', idTchat]);
  };
}
