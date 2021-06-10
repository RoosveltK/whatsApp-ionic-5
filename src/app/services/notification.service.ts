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
    private loading: LoadingController
  ) {}

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

  async loadingController(time: number) {
    const loading = await this.loading.create({
      spinner: 'crescent',
      duration: time,
      message: 'Veuillez patienter...',
      translucent: true,
    });
    return await loading.present();
  }
}
