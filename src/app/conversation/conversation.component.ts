import { AngularFireAuth } from '@angular/fire/auth';
import {
  InfoDiscussionService,
  Message,
  tchat,
} from './../services/info-discussion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  public idTchat;
  public userStatus = false;
  public secondStatus;
  public userInfo;
  public dateConnect;
  public userofDB = JSON.parse(localStorage.getItem('userofDB'));
  public userOfTChat = JSON.parse(localStorage.getItem('userOfTchat'));
  public allMessages: any = [];
  public textMessage: any;
  public isMessageRead = false;

  constructor(
    public activateRoute: ActivatedRoute,
    public infoService: InfoDiscussionService,
    public serviceFireBase: FirebaseService,
    public router: Router,
    public databasFire: AngularFirestore
  ) {
    this.serviceFireBase.verificationAuthUser((user) => {
      if (user) {
        localStorage.setItem('userMetaData', JSON.stringify(user.metadata));
        this.userStatus = true;
      } else {
        var getStorage = JSON.parse(localStorage.getItem('userMetaData'));
        const date = new Date(getStorage.lastSignInTime);
        if (date == new Date()) {
          this.dateConnect = `${date.getHours()}:${date.getMinutes()}`;
          this.secondStatus = true;
        } else {
          this.dateConnect = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
          this.secondStatus = false;
        }
      }
    });
    this.isMessageRead = true;
  }

  ngOnInit() {
    this.userInfo = this.infoService.recupActifUser();

    //Reception des infos du tchat
    this.activateRoute.params.subscribe((params) => (this.idTchat = params.id));
    this.infoService
      .getInDBSpecifique()
      .doc(this.idTchat)
      .snapshotChanges()
      .subscribe((res) => (this.allMessages = res.payload.get('messages')));
  }

  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };

  sendMessage = () => {
    const infoMessage: Message = {
      uidSend: this.userInfo.uid,
      messagetext: this.textMessage,
      date: new Date(),
      heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
      assets: [],
    };
    this.allMessages.push(infoMessage);
    this.infoService
      .getInDBSpecifique()
      .doc(this.idTchat)
      .update({ messages: this.allMessages });

    this.textMessage = '';
  };
}
