import { LanguageService } from './../services/language.service';
import { PopoverLangComponent } from './../popover-lang/popover-lang.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.page.html',
  styleUrls: ['./parametre.page.scss'],
})
export class ParametrePage implements OnInit {
  public isChangeTheme = false;
  public currentTheme;
  public theme = '';
  constructor(
    public router: Router,
    private popoverController: PopoverController,
    public serviceLanguage: LanguageService
  ) {
    this.serviceLanguage.setInitialAppLanguage();
  }

  ngOnInit() {
    if (localStorage.getItem('actuelTheme') != null)
      this.theme = JSON.parse(localStorage.getItem('actuelTheme'));
    else this.theme = 'light';
  }
  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };

  changeTheme = () => {
    if ('dark'.localeCompare(this.theme) == 0) {
      document.body.setAttribute('color-theme', 'dark');
    } else document.body.setAttribute('color-theme', 'light');
    localStorage.setItem('actuelTheme', JSON.stringify(this.theme));
  };

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverLangComponent,
      cssClass: 'my-custom-class',
      translucent: true,
      // event: ev,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
}
