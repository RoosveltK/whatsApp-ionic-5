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
  public contacts = [];
  public users = [];
  public actifUser;
  constructor(
    public router: Router,
    public service: InfoDiscussionService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.actifUser = this.service.recupActifUser();
    this.service
      .recupUser()
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          this.contacts.push(doc.data());
        });
        this.contacts.map((element) => {
          const refImage = this.afStorage.ref(element.photo);
          refImage.getDownloadURL().subscribe((res) => {
            this.users.push({
              nom: element.nom,
              email: element.email,
              id: element.id,
              photo: res,
            });
          });
        });
      });
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
      id: `${this.actifUser.uid}${userData.uid}`,
      nom: userData.nom,
      photo: [userData.photo],
      users: [this.actifUser.uid, userData.uid],
      messages: [],
    };

    const ctrlTchat = this.service.findUserById(newTchat);
    const link = ['conversation', ctrlTchat];
    if (ctrlTchat == newTchat) {
      this.service
        .saveTchatInDB()
        .add(newTchat)
        .then(() => {
          this.router.navigate(link);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.router.navigate(link);
  };
}
