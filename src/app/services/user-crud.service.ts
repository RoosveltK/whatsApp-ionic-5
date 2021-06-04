import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

// userSendId: this.userContact.uid,
// userReceiveId: this.essai,
// messagetext: this.textMessage,
// date: new Date().toISOString(),
//`${new Date().getHours()}H:${new Date().getMinutes()}`;
export interface User {
  id: string;
  email: string;
  nom: string;
  photo: any;
}
@Injectable({
  providedIn: 'root',
})
export class UserCRUDService {
  private filesCollection: AngularFirestoreCollection<User>;
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private serviceSideFire: FirebaseService,
    private router: Router
  ) {}

  savefile(event: FileList) {
    const file = event.item(0);
    // Image validation
    if (file.type.split('/')[0] !== 'image') {
      this.serviceSideFire.dangerToast(`Type de fichier non pris en charge`);
      return 0;
    }
    return file;
  }

  uploadImage(file: File, datas: User, user) {
    // Storage path
    const fileStoragePath = `userProfilImage/${file.name}_UID:${user.uid}`;

    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);
    imageRef
      .put(file)
      .then((res) => {
        // imageRef.getDownloadURL().subscribe((url) => {
        this.serviceSideFire.saveUserInDB(user.uid).set({
          id: user.uid,
          email: datas.email,
          nom: datas.nom,
          photo: fileStoragePath,
        });
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 2000);
        this.serviceSideFire.verificationEmail(user);
        this.serviceSideFire.successToast(
          `Compte cree avec succes, consulter votre boite mail`
        );
        // });
      })
      .catch((err) => this.serviceSideFire.dangerToast(err.message));
  }
}

///autres

// this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
//   finalize(() => {
//     // Retreive uploaded image storage path
//     const link = imageRef.getDownloadURL().toString();
//     console.log(imageRef);

//     this.UploadedImageURL.subscribe(
//       (resp) => console.log(resp)
//       (resp) => {
//         this.saveInFirestore().set({
//           email: datas.email,
//           nom: datas.nom,
//           photo: resp,
//         });
//         this.isFileUploading = false;
//         this.isFileUploaded = true;
//         this.serviceSideFire.successToast(
//           `Veuillez consulter votre boite mail pour activer votre compte`
//         );
//       },
//       (error) => {
//         this.serviceSideFire.dangerToast(
//           `Erreur véuillez réesayez ultérieurement`
//         );
//       }
// File upload task
// this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);
//     );
//   }),
//   tap((snap) => {
//     this.imgSize = snap.totalBytes;
//   })
// );
