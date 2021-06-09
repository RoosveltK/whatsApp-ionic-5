import {
  InfoDiscussionService,
  tchat,
} from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

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
    public infoSevice: InfoDiscussionService,
    private activateRoute: ActivatedRoute,
    public router: Router,
    private serviceDiscussion: InfoDiscussionService,
    private fireMessage: AngularFirestore
  ) {}

  ngOnInit() {
    this.fireMessage
      .collection(`tchats/`)
      .snapshotChanges()
      .subscribe((res) => {
        this.allTchat = [];
        res.map((element: any) => {
          this.allTchat.push(element.payload.doc.data());
        });
        console.log(this.allTchat);
      });
  }

  public viewConversation(datas) {
    localStorage.setItem('userOfTchat', JSON.stringify(datas));
    const link = ['conversation', datas.id];
    this.router.navigate(link);
  }

  openNewDisc() {
    this.router.navigate(['/newdisc']);
  }
}
