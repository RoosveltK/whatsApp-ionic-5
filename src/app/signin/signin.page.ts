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
import { InfoDiscussionService } from '../services/info-discussion.service';

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
    private serviceDiscussion: InfoDiscussionService
  ) {}

  loginUser(datas) {
    this.serviceNotification.loadingController(50000);
    this.fireebaseAuth
      .loginUser(datas.email, datas.password)
      .then((res) => {
        if (res.user.emailVerified == false) {
          this.serviceNotification.closeLoader();
          this.serviceNotification.confirmationAlert(
            `SIGNIN.emailNonVerifie`,
            this.fireebaseAuth.verificationEmail(res.user),
            console.log('ok tu maitrises'),
            `SIGNIN.yes`,
            `SIGNIN.no`
          );
        } else {
          this.serviceDiscussion.setActifUser(res.user.uid).then(() => {
            setTimeout(() => {
              this.serviceNotification.closeLoader();
              this.fireebaseAuth.setUserOnline(res.user.uid);
              this.userForms.reset();
              this.router.navigate(['/tabs/tchat']);
            }, 3000);
          });
        }
      })
      .catch((err) => {
        this.serviceNotification.closeLoader();
        this.serviceNotification.dangerToast(err.message);
      });
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
