import { NotificationService } from './notification.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AlertController, ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  nom: string;
  photo: any;
}
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userData: any;
  constructor(
    public aFireAuth: AngularFireAuth,
    public aFireStore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router,
    private serviceNotification: NotificationService
  ) {}

  //Sauvegarder les datas d'un user
  saveUserInDB = (id) => this.aFireStore.doc(`users/${id}`);
  

  //Envoyer l'email de verification
  verificationEmail = (userConnected) => userConnected.sendEmailVerification();

  // DeleteUser
  // deleteUser = (id) => id.dele;

  //Connexion de l'utilisateur
  loginUser = (email, password) =>
    this.aFireAuth.signInWithEmailAndPassword(email, password);

  //Creation de compte Pour athentification
  signup = (email, password) =>
    this.aFireAuth.createUserWithEmailAndPassword(email, password);

  //verification authentification
  verificationAuthUser = (callBack) =>
    this.aFireAuth.onAuthStateChanged(callBack);

  //Deconnexion
  signOutUser = () => this.aFireAuth.signOut();

  //Resetpassword
  resetPasswordUser = (email) => this.aFireAuth.sendPasswordResetEmail(email);

  getAndVerifyFile(event: FileList) {
    const file = event.item(0);

    // Image validation controle
    if (file.type.split('/')[0] !== 'image') {
      this.serviceNotification.dangerToast(
        `Type de fichier non pris en charge`
      );
      return 0;
    }
    return file;
  }

  createRefForImage = (path) => this.afStorage.ref(path);

  async uploadImageAndCreateAccount(file: File, datas: User, user) {
    // Storage path
    const fileStoragePath = `userProfilImage/${file.name}_UID:${user.uid}`;

    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);
    imageRef
      .put(file)
      .then((res) => {
        this.saveUserInDB(user.uid).set({
          id: user.uid,
          email: datas.email,
          nom: datas.nom,
          photo: fileStoragePath,
          statut: false,
          lastConnect: 0,
        });

        this.verificationEmail(user);
        this.serviceNotification.successToast(
          `Compte cree avec succes, consulter votre boite mail`
        );
      })
      .catch((err) => this.serviceNotification.dangerToast(err.message));
  }

  uploadImage(file: File, path) {
    // Image reference
    const imageRef = this.afStorage.ref(path);
    return imageRef.put(file);
  }


  statutUser=(user)=>{
    this.saveUserInDB(user.id).set({
      id: user.id,
      email: user.email,
      nom: user.nom,
      photo: user.photo,
      statut: true,
      lastConnect: 0,
    });
  }
}
