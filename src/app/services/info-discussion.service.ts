import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

export interface Message {
  uidSend: string;
  messagetext: string;
  date: Date;
  heure: string;
  assets: string;
  read: boolean;
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
export class InfoDiscussionService implements OnInit {
  public myTchats: any = [];
  public allUsers: any = [];
  constructor(
    public fireMessage: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.getInfoOfTchat();
    this.getAllUsers(this.allUsers);
  }

  findTChatById = (idTchat: string, idTchat2: string) => {
    let id = null;
    this.myTchats.map((element) => {
      if (element.id.localeCompare(idTchat) == 0) id = idTchat;
      else if (element.id.localeCompare(idTchat2) == 0) id = idTchat2;
    });
    return id;
  };

  //Recuperer l'utilisateur qui utilise l'application sur cet appareil
  getActifUser = () => JSON.parse(localStorage.getItem('users'));

  //Sauvegarder les tchats en BD grace a l'id
  saveTchatInDB = (id) => this.fireMessage.doc(`tchats/${id}`);

  //Lien pour recuperer tout les tchats presents en BD
  getAllTchats = () => this.fireMessage.collection(`tchats/`);

  getInfoOfTchat = () => {
    this.getAllTchats()
      .snapshotChanges()
      .subscribe((res) => {
        this.myTchats = [];
        res.map((element) => {
          this.myTchats.push(element.payload.doc.data());
        });
      });
  };

  //Lien pour recuperer tout users presents en BD
  getUsers = () => this.fireMessage.collection(`users/`);

  searchUserById = (id, tab) => {
    let datas;
    tab.forEach((element: any) => {
      if (element.id.localeCompare(id) == 0) datas = element;
    });
    return datas;
  };

  //Recuperer les utilisateurs avec les photos : chemin absolu
  getAllUsers = async (users) => {
    var tableau = [];
    this.getUsers()
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          tableau.push(doc.data());
        });

        tableau.map((element) => {
          const refImage = this.afStorage.ref(element.photo);
          refImage.getDownloadURL().subscribe((res) => {
            if (element.id.localeCompare(this.getActifUser().uid) == 0) {
              const datas = {
                nom: element.nom,
                email: element.email,
                id: element.id,
                photo: res,
              };
              localStorage.setItem('infoUserInDB', JSON.stringify(datas));
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
