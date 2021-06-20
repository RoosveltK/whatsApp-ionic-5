import { NotificationService } from './../services/notification.service';
import { Router } from '@angular/router';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  public email = new FormControl(
    '',
    Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
    ])
  );
  constructor(
    public firebaseAuth: FirebaseService,
    public router: Router,
    private serviceNotification: NotificationService
  ) {}

  ngOnInit() {}

  sendVerification() {
    const link = ['/signin'];
    this.serviceNotification.loadingController(8000);
    this.firebaseAuth
      .resetPasswordUser(this.email.value)
      .then((res) => {
        this.serviceNotification.closeLoader();
        this.serviceNotification.warningToast(`Vérifier votre boite mail`);
        this.email.reset();
        this.router.navigate(link);
      })
      .catch((err) => {
        this.serviceNotification.closeLoader();
        this.serviceNotification.warningToast(err.message);
      });
  }

  backLogin() {
    this.router.navigate(['/signin']);
  }
}
