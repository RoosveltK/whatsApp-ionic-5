import { InfoDiscussionService } from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverLangComponent } from '../components/popover/popover-lang/popover-lang.component';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.page.html',
  styleUrls: ['./parametre.page.scss'],
})
export class ParametrePage implements OnInit {
  public user;
  public isChangeTheme = false;
  public currentTheme;
  public theme = '';
  constructor(
    public router: Router,
    private popoverController: PopoverController,
    private serviceDiscussion: InfoDiscussionService
  ) {}

  ngOnInit() {
    this.user = this.serviceDiscussion.getActifUser();
    if (localStorage.getItem('ACTUEL_THEME') != null)
      this.theme = JSON.parse(localStorage.getItem('ACTUEL_THEME'));
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
    localStorage.setItem('ACTUEL_THEME', JSON.stringify(this.theme));
  };

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: PopoverLangComponent,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
  scanQRCode() {
    this.router.navigate(['/qrcode']);
  }
}
