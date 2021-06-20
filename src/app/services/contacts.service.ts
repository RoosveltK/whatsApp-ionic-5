import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private firestorage: AngularFirestore) {}

  getStatus = (id) => this.firestorage.doc(`status/${id}`);

  postSatus = async (id, content, date, user) => {
    this.getStatus(id).set({
      id: id,
      content: content,
      date: date,
      userId: user.id,
      userNom: user.nom,
    });
  };

  getStatusCollection = () => this.firestorage.collection('status');
}
