import { LanguageService } from './../services/language.service';
import { NotificationService } from './../services/notification.service';
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
      { type: 'required', message: `SIGNIN.emailVide` },
      { type: 'pattern', message: `SIGNIN.emailIncorrect` },
    ],
    password: [
      {
        type: 'required',
        message: `SIGNIN.passwordVide`,
      },
      {
        type: 'minLength',
        message: `SIGNIN.passwordIncorrect`,
      },
    ],
  };
  public userForms: FormGroup;
  public userInfo;
  constructor(
    public formBuilder: FormBuilder,
    public fireebaseAuth: FirebaseService,
    public router: Router,
    private serviceNotification: NotificationService,
    private serviceLanguage: LanguageService
  ) {
    this.serviceLanguage.setInitialAppLanguage();
  }

  loginUser(datas) {
    this.serviceNotification.loadingController(2000);
    this.fireebaseAuth
      .loginUser(datas.email, datas.password)
      .then((res) => {
        this.userForms.value.email = '';
        this.userForms.value.password = '';
        if (res.user.emailVerified == false) {
          this.serviceNotification.confirmationAlert(
            `SIGNIN.emailNonVerifie`,
            this.fireebaseAuth.verificationEmail(res.user),
            console.log('ok tu maitrises'),
            `SIGNIN.yes`,
            `SIGNIN.no`
          );
        } else {
          localStorage.setItem('users', JSON.stringify(res.user));
          this.router.navigate(['/tabs/tchat']);
        }
      })
      .catch((err) => this.serviceNotification.dangerToast(err.message));
  }

  ngOnInit() {
    if (localStorage.getItem('actuelTheme') != null) {
      let theme = JSON.parse(localStorage.getItem('actuelTheme'));
      console.log(theme);

      document.body.setAttribute('color-theme', theme);
    }

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
