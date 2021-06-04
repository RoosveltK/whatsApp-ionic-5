import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Message {
  messagetext: string;
  date: string;
  heure: string;
  assets: Array<string>;
}
export interface tchat {
  id: string;
  nom: string;
  photo: Array<string>;
  users: Array<string>;
  messages: Array<Message>;
}
@Injectable({
  providedIn: 'root',
})
export class InfoDiscussionService {
  public myTchats: any;
  public fii = false;
  constructor(public fireMessage: AngularFirestore) {
    // this.recupUser()
    //   .snapshotChanges()
    //   .subscribe((actions) => {
    //     this.myUsers = [];
    //     actions.forEach((action) => {
    //       this.myUsers.push(action.payload.doc.data());
    //     });
    //   });

    this.saveTchatInDB()
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          this.myTchats.push(doc.data());
        });
      });
  }

  public findUserById(tchatBegin: tchat) {
    this.myTchats.forEach((element) => {
      if (element.id == element.id) return element;
    });
    return tchatBegin;
    // const user = this.myTchats.find((infoTchat) => {
    //   return infoTchat.id == id;
    // });
    // return user;
  }

  //Actif user
  recupActifUser = () => JSON.parse(localStorage.getItem('users'));
  //Sauvegarder les tchats
  saveTchatInDB = () => this.fireMessage.collection(`tchats/`);

  // //Sauvegarder les messages
  // saveMessagesInDB = () => this.fireMessage.collection(`messages/`);

  //Recuperer messages
  recupUser = () => this.fireMessage.collection(`users/`);

  // sendMessage = (status: boolean, datas: Message) => {
  //   if (status) {
  //     this.saveMessagesInDB().add(datas);
  //   }
  // };
}
