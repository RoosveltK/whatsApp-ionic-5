import { FirebaseService } from 'src/app/services/firebase.service';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

export interface Message {
  uidSend: string;
  nomSend: string;
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
  //Variables localStorage
  public INF0_USER_CAME_FROM_DB = 'INF0_USER_CAME_FROM_DB';
  public USER_OF_TCHAT = 'USER_OF_TCHAT';
  public GROUP_OF_TCHAT = 'GROUP_OF_TCHAT';
  public USER_OF_GROUP = 'USER_OF_GROUP';

  public myTchats: any = [];
  public allUsers: any = [];
  public usersInfoOfDB;

  public passData;
  constructor(
    public afirestore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
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

  //Garder le user actif
  setActifUser = async (id) => {
    this.afirestore
      .collection(`users`)
      .doc(id)
      .snapshotChanges()
      .subscribe((res) => {
        let myInfo = {
          id: res.payload.get('id'),
          nom: res.payload.get('nom'),
          email: res.payload.get('email'),
          photo: res.payload.get('photo'),
          statut: res.payload.get('statut'),
          lastConnect: res.payload.get('lastConnect'),
        };
        const ref = this.afStorage.ref(myInfo.photo);
        ref.getDownloadURL().subscribe((res) => {
          myInfo.photo = res;
          localStorage.setItem(
            this.INF0_USER_CAME_FROM_DB,
            JSON.stringify(myInfo)
          );
        });
      });
  };

  getUserofTchatSubscribe = () => this.afirestore.collection(`users`);

  //Recuperer l'utilisateur qui utilise l'application sur cet appareil
  getActifUser = () =>
    JSON.parse(localStorage.getItem(this.INF0_USER_CAME_FROM_DB));

  //Sauvegarder les tchats en BD grace a l'id
  saveTchatInDB = (id) => this.afirestore.doc(`tchats/${id}`);

  //Lien pour recuperer tout les tchats presents en BD
  getAllTchats = () => this.afirestore.collection(`tchats/`);

  getUserOfTChat = () => JSON.parse(localStorage.getItem(this.USER_OF_TCHAT));

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
  getUsers = () => this.afirestore.collection(`users/`);

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
        ss.docs.forEach((doc) => tableau.push(doc.data()));
        const newArray = tableau.sort(function (a, b) {
          return a.nom.localeCompare(b.nom);
        });
        newArray.map((element) => {
          const refImage = this.afStorage.ref(element.photo);
          refImage.getDownloadURL().subscribe((res) => {
            if (element.id.localeCompare(this.getActifUser().id) != 0)
              users.push({
                nom: element.nom,
                email: element.email,
                id: element.id,
                photo: res,
                statut: element.statut,
                lastConnect: element.lastConnect,
              });
          });
        });
      });
    this.getInfoOfTchat();
  };
}
