import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCRUDService } from '../services/user-crud.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  // public validationUserMessage = {
  //   email: [
  //     { type: 'required', message: "s'il vous plait entrez votre Email" },
  //     { type: 'pattern', message: "l'email entré est incorrect, Réessayer" },
  //   ],
  //   password: [
  //     {
  //       type: 'required',
  //       message: "s'il vous plait entrez votre mot de passe",
  //     },
  //     {
  //       type: 'minLength',
  //       message: 'le mot de passe doit avoir au moins 5 caractères',
  //     },
  //   ],
  // };
  public user: FormGroup;
  public image;
  constructor(
    public formBuilder: FormBuilder,
    public firebaseService: FirebaseService,
    public uploadService: UserCRUDService
  ) {
    this.user = this.formBuilder.group({
      email: ['', Validators.required],
      nom: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  addUser(userInfo) {
    if (this.image == undefined || this.image == 0) {
      this.firebaseService.dangerToast(
        `Veuillez selectionner une photo de profil conforme avant de continuer`
      );
      return;
    }
    this.firebaseService
      .signup(userInfo.email, userInfo.password)
      .then((res) => {
        this.uploadService.uploadImage(this.image, userInfo, res.user);
      })
      .catch((err) => {
        console.log(err);
        this.firebaseService.dangerToast(err.message);
      });
  }

  saveFile(fichier) {
    this.image = this.uploadService.savefile(fichier);
  }
}

//add bd
// this.firebaseService.saveUserInDB(res.user.uid).set({
//   nom: userInfo.nom,
//   email: userInfo.email,
// })
