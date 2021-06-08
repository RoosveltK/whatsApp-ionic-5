import { NotificationService } from './../services/notification.service';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  public user: FormGroup;
  public image;
  imagePickerConf = {
    borderRadius: '50%',
    language: 'en',
    width: '200px',
    height: '200px',
  };
  constructor(
    public formBuilder: FormBuilder,
    public firebaseService: FirebaseService,
    private router: Router,
    private serviceNotification: NotificationService
  ) {
    this.user = this.formBuilder.group({
      email: ['', Validators.required],
      nom: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  addUser = (userInfo) => {
    if (this.image == undefined || this.image == 0) {
      this.serviceNotification.dangerToast(
        `Veuillez selectionner une photo de profil conforme avant de continuer`
      );
      return;
    }
    this.firebaseService
      .signup(userInfo.email, userInfo.password)
      .then((res) =>
        this.firebaseService.uploadImageAndCreateAccount(
          this.image,
          userInfo,
          res.user
        )
      )
      .catch((err) => {
        this.serviceNotification.dangerToast(err.message);
      });
  };

  saveFile = (fichier) =>
    (this.image = this.firebaseService.getAndVerifyFile(fichier));

  backLogin = () => this.router.navigate(['/']);
}
