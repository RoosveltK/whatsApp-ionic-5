import { Router } from '@angular/router';
import {
  tchat,
  InfoDiscussionService,
} from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creategroup-last-phase',
  templateUrl: './creategroup-last-phase.page.html',
  styleUrls: ['./creategroup-last-phase.page.scss'],
})
export class CreategroupLastPhasePage implements OnInit {
  public groupName;
  public groupImage;
  public member = [];
  constructor(
    private serviceTchat: InfoDiscussionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.member = JSON.parse(localStorage.getItem('userofGroup'));
  }

  createGroup = () => {
    if (this.groupName == ' ')
      console.log(
        `  Veuillez donner un sujet au groupe et éventuellement, une icone de groupe`
      );
    else {
      const pathOfDefaultImage = `imageGroupe/defaultImage.jpg`;
      const tchatGroup: tchat = {
        id: '0', //generer automatiquement
        nom: this.groupName,
        photo:
          this.groupImage == undefined ? pathOfDefaultImage : this.groupImage,
        users: [],
        messages: [],
      };
      this.serviceTchat
        .saveTchatInDB(tchatGroup.id)
        .set(tchatGroup)
        .then(() => this.router.navigate(['conversation', tchatGroup.id]))
        .catch((err) => console.log(err));
    }
  };
}
