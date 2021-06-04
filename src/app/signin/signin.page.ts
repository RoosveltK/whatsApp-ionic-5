import { AlertController } from '@ionic/angular';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  public validationUserMessage = {
    email: [
      { type: 'required', message: "s'il vous plait entrez votre Email" },
      { type: 'pattern', message: "l'email entré est incorrect, Réessayer" },
    ],
    password: [
      {
        type: 'required',
        message: "s'il vous plait entrez votre mot de passe",
      },
      {
        type: 'minLength',
        message: 'le mot de passe doit avoir au moins 5 caractères',
      },
    ],
  };
  public userForms: FormGroup;
  public userInfo;
  constructor(
    public formBuilder: FormBuilder,
    public authentif: FirebaseService,
    public router: Router
  ) {}
  loginUser(datas) {
    this.authentif
      .loginUser(datas.email, datas.password)
      .then((res) => {
        if (res.user.emailVerified == false) {
          this.authentif.confirmationAlert(
            "Votre adresse mail n'est pas vérifiée renvoyez l'email de verification ?",
            this.authentif.verificationEmail(res.user),
            console.log('ok tu maitrises'),
            'oui',
            'non'
          );
        } else {
          localStorage.setItem('users', JSON.stringify(res.user));
          this.router.navigate(['/tabs/tchat']);
        }
      })
      .catch((err) => this.authentif.dangerToast(err.message));
  }

  ngOnInit() {
    this.userForms = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }
}
