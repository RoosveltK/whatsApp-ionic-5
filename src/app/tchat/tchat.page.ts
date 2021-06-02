import {
  InfoDiscussionService,
  infoContact,
} from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tchat',
  templateUrl: 'tchat.page.html',
  styleUrls: ['tchat.page.scss'],
})
export class TchatPage implements OnInit {
  public userContact: infoContact;
  public user;

  constructor(
    public infoSevice: InfoDiscussionService,
    private activateRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.user = this.infoSevice.user;
  }

  public viewConversation(datas) {
    const link = ['conversation', datas.id];
    this.router.navigate(link);
  }
}
