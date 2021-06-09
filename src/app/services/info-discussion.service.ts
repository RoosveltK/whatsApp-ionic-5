import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

export interface Message {
  uidSend: string;
  messagetext: string;
  date: Date;
  heure: string;
  assets: Array<string>;
}
export interface tchat {
  id: string;
  nom: Array<string>;
  photo: Array<string>;
  users: Array<string>;
  messages: Array<Message>;
}
@Injectable({
  providedIn: 'root',
})
export class InfoDiscussionService {
  public myTchats: any = [];
  constructor(
    public fireMessage: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    this.fireMessage
      .collection(`tchats/`)
      .snapshotChanges()
      .subscribe((res) => {
        this.myTchats = [];
        res.map((element) => {
          this.myTchats.push(element.payload.doc.data());
        });
        
      });
  }

  public findUserById(idTchat: string, idTchat2: string) {
    let id = null;
    this.myTchats.map((element) => {
      if (element.id.localeCompare(idTchat) == 0) {
        id = idTchat;
      } else if (element.id.localeCompare(idTchat2) == 0) {
        id = idTchat2;
      }
    });
    return id;
  }



  //Actif user
  recupActifUser = () => JSON.parse(localStorage.getItem('users'));
  //Sauvegarder les tchats
  saveTchatInDB = (id) => this.fireMessage.doc(`tchats/${id}`);

  //Get les tchats
  getInDBSpecifique = () => this.fireMessage.collection(`tchats`);

  // Get les tchats
  // getInDbAll = () => this.fireMessage.collection(`tchats/`);

  //Recuperer messages
  recupUser = async (users) => {
    var tableau = [];
    this.fireMessage
      .collection(`users/`)
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          tableau.push(doc.data());
        });

        tableau.map((element) => {
          const refImage = this.afStorage.ref(element.photo);
          refImage.getDownloadURL().subscribe((res) => {
            if (element.id.localeCompare(this.recupActifUser().uid) == 0) {
              const datas = {
                nom: element.nom,
                email: element.email,
                id: element.id,
                photo: res,
              };
              localStorage.setItem('userofDB', JSON.stringify(datas));
            } else {
              users.push({
                nom: element.nom,
                email: element.email,
                id: element.id,
                photo: res,
                isThere: false,
              });
            }
          });
        });
      });
  };
}
