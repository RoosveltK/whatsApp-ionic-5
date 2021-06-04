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
  public infoTchat: tchat;
  public userStatus = false;
  public userInfo;
  public allMessages: any = [];
  public textMessage: any;
  public myArray: any = [];
  public fii = false;
  constructor(
    public activateRoute: ActivatedRoute,
    public infoService: InfoDiscussionService,
    public serviceFireBase: FirebaseService,
    public router: Router,
    public databasFire: AngularFirestore
  ) {
    this.serviceFireBase.verificationAuthUser((user) => {
      if (user) {
        this.userInfo = user;
        this.userStatus = true;
        // this.getAllMessage();
      } else console.log('OFFlINE');
    });
  }

  ngOnInit() {
    //Routes en fonction des conversations
    this.activateRoute.params.subscribe(
      (params) => (this.infoTchat = params.newTchat)
    );
  }
  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };

  sendMessage = () => {
    const infoMessage: Message = {
      messagetext: this.textMessage,
      date: new Date().toISOString(),
      heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
      assets: [],
    };
    this.infoService.saveTchatInDB().doc('messages/').set(infoMessage);
    this.textMessage = '';
  };

  // getAllMessage() {
  //   this.infoService
  //     .saveTchatInDB()
  //     .doc('messages/')
  //     .snapshotChanges()
  //     .subscribe((actions) => {
  //       this.allMessages = [];
  //       actions.forEach((action) => {
  //         this.allMessages.push(action.payload.doc.data());
  //       });
  //     });
  // }
}
