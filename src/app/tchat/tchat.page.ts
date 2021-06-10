import {
  InfoDiscussionService,
  tchat,
} from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tchat',
  templateUrl: 'tchat.page.html',
  styleUrls: ['tchat.page.scss'],
})
export class TchatPage implements OnInit {
  public user;
  public userData;
  public allTchat: tchat[] = [];
  constructor(
    public router: Router,
    private serviceDiscussion: InfoDiscussionService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.serviceDiscussion
      .getAllTchats()
      .snapshotChanges()
      .subscribe((res) => {
        this.allTchat = [];
        res.map((element: any) => {
          this.allTchat.push(element.payload.doc.data());
        });
      });
  }

  public viewConversation(datas) {
    // localStorage.setItem('userOfTchat', JSON.stringify(datas));
    // const link = ['conversation', datas.id];
    // this.router.navigate(link);
    console.log(datas);
  }

  openNewDisc() {
    this.router.navigate(['/newdisc']);
  }
}
