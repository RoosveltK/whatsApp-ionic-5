import {
  InfoDiscussionService,
  tchat,
} from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-newdisc',
  templateUrl: './newdisc.page.html',
  styleUrls: ['./newdisc.page.scss'],
})
export class NewdiscPage implements OnInit {
  public show = false;
  public searchText;
  public users = [];
  public actifUser;
  public actifUserofDB;
  constructor(
    public router: Router,
    public service: InfoDiscussionService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.actifUser = this.service.getActifUser();
    this.service
      .getAllUsers(this.users)
      .then(
        () =>
          (this.actifUserofDB = JSON.parse(
            localStorage.getItem('infoUserInDB')
          ))
      );
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
      id: `${userData.id}${this.actifUser.uid}`,
      nom: [userData.nom, this.actifUserofDB.nom],
      photo: [userData.photo, this.actifUserofDB.photo],
      users: [userData.id, this.actifUser.uid],
      messages: [],
    };
    localStorage.setItem('userOfTchat', JSON.stringify(userData));

    const idTchat = this.service.findTChatById(
      newTchat.id,
      `${this.actifUser.uid}${userData.id}`
    );
    if (idTchat == null) {
      this.service
        .saveTchatInDB(newTchat.id)
        .set(newTchat)
        .then(() => this.router.navigate(['conversation', newTchat.id]))
        .catch((err) => console.log(err));
    } else this.router.navigate(['conversation', idTchat]);
  };
}
