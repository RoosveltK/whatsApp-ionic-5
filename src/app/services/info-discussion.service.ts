import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface infoContact {
  image: string;
  nom: string;
}

export interface Message {
  userSendId: string;
  userReceiveId: string;
  messagetext: string;
  date: string;
  heure: string;
}
@Injectable({
  providedIn: 'root',
})
export class InfoDiscussionService {
  public myUsers: any;
  public fii = false;
  constructor(public fireMessage: AngularFirestore) {
    this.recupUser()
      //   .get()
      //   .subscribe((users) => {
      //     users.docs.forEach((doc) => {
      //       this.myUsers.push(doc.data());
      //     });
      //   });

      .snapshotChanges()
      .subscribe((actions) => {
        this.myUsers = [];
        actions.forEach((action) => {
          this.myUsers.push(action.payload.doc.data());
        });
      });
  }
  public user = [
    {
      id: 1,
      image: '../../assets/profil.jpg',
      nom: 'Roosvelt',
      heure: '7:23',
      message: 'Salut comment tu vas ?',
    },
    {
      id: 2,
      image: '../../assets/avatar1.png',
      nom: 'Debora',
      heure: '16:45',
      message: "Ne m'ecris plus salaud ",
    },
    {
      id: 3,
      image: '../../assets/avatar2.jpg',
      nom: 'Chat 🏩',
      heure: '00:02',
      message: 'Bae je veux les nudes',
    },
    {
      id: 4,
      image: '../../assets/avatar3.jpeg',
      nom: 'My love 💟',
      heure: '7:23',
      message: 'Bonjour maman, pardon mon argent du mois est fini',
    },
  ];

  public findUserById(id: string) {
    const user = this.myUsers.find((userInfo) => {
      return userInfo.id == id;
    });
    return user;
  }

  //Sauvegarder messages
  saveMessagesInDB = () => this.fireMessage.collection(`Messages/`);

  //Recuperer messages
  recupUser = () => this.fireMessage.collection(`users/`);

  sendMessage = (status: boolean, datas: Message) => {
    if (status) {
      this.saveMessagesInDB().add(datas);
    }
  };
}
