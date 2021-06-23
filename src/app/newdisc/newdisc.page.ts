import { NotificationService } from './../services/notification.service';
import {
  InfoDiscussionService,
  tchat,
} from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    public serviceDiscussion: InfoDiscussionService,
    private serviceNotification: NotificationService
  ) {}

  ngOnInit() {
    this.actifUserofDB = this.serviceDiscussion.getActifUser();
    this.serviceDiscussion.getAllUsers(this.users);
  }

  startDiscu = (userData: any) => {
    const newTchat: tchat = {
      id: `${userData.id}${this.actifUserofDB.id}`,
      nom: [userData.nom, this.actifUserofDB.nom],
      photo: [userData.photo, this.actifUserofDB.photo],
      users: [userData.id, this.actifUserofDB.id],
      messages: [],
    };
    localStorage.setItem(
      this.serviceDiscussion.USER_OF_TCHAT,
      JSON.stringify(userData)
    );
    const idTchat = this.serviceDiscussion.findTChatById(
      newTchat.id,
      `${this.actifUserofDB.id}${userData.id}`
    );
    if (idTchat == null) {
      this.serviceNotification.loadingController(2000);
      this.serviceDiscussion
        .saveTchatInDB(newTchat.id)
        .set(newTchat)
        .then(() => this.router.navigate(['conversation', newTchat.id]))
        .catch((err) => console.log(err));
    } else this.router.navigate(['conversation', idTchat]);
  };
}
