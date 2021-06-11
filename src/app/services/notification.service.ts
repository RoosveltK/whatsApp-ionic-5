import { LanguageService } from './language.service';
import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    public toast: ToastController,
    public alert: AlertController,
    private loading: LoadingController,
    private serviceLanguage: LanguageService
  ) {}

  //TOAST
  dangerToast = async (message) => {
    const toast = await this.toast.create({
      message: this.serviceLanguage.translateInstant(message),
      duration: 5000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  };

  warningToast = async (message) => {
    const toast = await this.toast.create({
      message: this.serviceLanguage.translateInstant(message),
      duration: 5000,
      position: 'top',
      color: 'warning',
    });
    toast.present();
  };

  successToast = async (message) => {
    const toast = await this.toast.create({
      message: this.serviceLanguage.translateInstant(message),
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
      message: this.serviceLanguage.translateInstant(message),
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

  async loadingController(time: number) {
    let msg = `SERVICE.Notification.wait`;

    const loading = await this.loading.create({
      spinner: 'crescent',
      duration: time,
      message: this.serviceLanguage.translateInstant(msg),
      translucent: true,
    });
    return await loading.present();
  }
}
