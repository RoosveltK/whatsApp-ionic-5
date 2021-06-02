import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userData: any;
  constructor(
    public firebaseAPIAuth: AngularFireAuth,
    public firebaseAPIFirestore: AngularFirestore,
    public toast: ToastController,
    public alert: AlertController
  ) {}

  //Sauvegarder les datas d'un user
  saveUserInDB = (id) => this.firebaseAPIFirestore.doc(`users/${id}`);



  //VerificationEmail
  verificationEmail = (userConnected) => userConnected.sendEmailVerification();

  //DeleteUser
  // deleteUser = (id) => this.firebaseAPIAuth.deleteUser(id);

  //Connexion de l'utilisateur
  loginUser = (email, password) =>
    this.firebaseAPIAuth.signInWithEmailAndPassword(email, password);

  //Creation de compte
  signup = (email, password) =>
    this.firebaseAPIAuth.createUserWithEmailAndPassword(email, password);

  //verification authentification
  verificationAuthUser = (callBack) =>
    this.firebaseAPIAuth.onAuthStateChanged(callBack);

  //Deconnexion
  signOutUser = () => this.firebaseAPIAuth.signOut();

  //Resetpassword
  resetPasswordUser = (email) =>
    this.firebaseAPIAuth.sendPasswordResetEmail(email);

  //TOAST
  dangerToast = async (message, postion = 'top') => {
    const toast = await this.toast.create({
      message: message,
      duration: 5000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  };

  warningToast = async (message, postion = 'top') => {
    const toast = await this.toast.create({
      message: message,
      duration: 5000,
      position: 'top',
      color: 'warning',
    });
    toast.present();
  };

  successToast = async (message, postion = 'top') => {
    const toast = await this.toast.create({
      message: message,
      duration: 5000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  };

  //Alert
  async confirmationAlert(message, fonction1, fonction2, text1, text2) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      message: message,
      buttons: [
        {
          text: text1,

          cssClass: 'secondary',
          handler: fonction1,
        },
        {
          text: text2,
          handler: fonction2,
        },
      ],
    });

    await alert.present();
  }
}
