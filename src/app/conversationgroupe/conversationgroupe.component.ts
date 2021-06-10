import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import {
  InfoDiscussionService,
  Message,
} from '../services/info-discussion.service';

@Component({
  selector: 'app-conversationgroupe',
  templateUrl: './conversationgroupe.component.html',
  styleUrls: ['./conversationgroupe.component.scss'],
})
export class ConversationgroupeComponent implements OnInit {
  public idTchat;
  public userInfo;
  public dateConnect;
  public infoUserInDB = JSON.parse(localStorage.getItem('infoUserInDB'));
  public groupOfTchat = JSON.parse(localStorage.getItem('groupOfTchat'));
  public allMessages: any = [];
  public textMessage: any;
  public isMessageRead = false;
  public image;
  constructor(
    public activateRoute: ActivatedRoute,
    public infoService: InfoDiscussionService,
    public serviceFireBase: FirebaseService,
    public router: Router,
    public databasFire: AngularFirestore,
    public afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.infoUserInDB = JSON.parse(localStorage.getItem('infoUserInDB'));

    this.activateRoute.params.subscribe((params) => (this.idTchat = params.id));
    this.infoService
      .getAllTchats()
      .doc(this.idTchat)
      .snapshotChanges()
      .subscribe((res) => (this.allMessages = res.payload.get('messages')));

    const refImage = this.afStorage.ref(this.groupOfTchat.photo[0]);
    refImage.getDownloadURL().subscribe((res) => {
      this.image = res;
    });
  }

  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };

  getInfoOfTchat = async () =>
    (this.groupOfTchat = JSON.parse(localStorage.getItem('groupOfTchat')));

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
      .getAllTchats()
      .doc(this.idTchat)
      .update({ messages: this.allMessages });

    this.textMessage = '';
  };
}
