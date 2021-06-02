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
  constructor(public firebaseAUTH: FirebaseService, public router: Router) {}

  ngOnInit() {}

  sendVerification() {
    const link = ['/signin'];
    this.firebaseAUTH.resetPasswordUser(this.email.value).then((res) => {
      setTimeout(() => {
        this.firebaseAUTH.warningToast(`Vérifier votre boite mail`);
        this.router.navigate(link);
      }, 2000);
    });
  }
  backLogin() {
    this.router.navigate(['/signin']);
  }
}
