import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.page.html',
  styleUrls: ['./parametre.page.scss'],
})
export class ParametrePage implements OnInit {
  public isChangeTheme = false;
  public currentTheme;
  public theme = '';
  constructor(public router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('actuelTheme') != null)
      this.theme = JSON.parse(localStorage.getItem('actuelTheme'));
    else this.theme = 'clair';
  }
  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };

  changeTheme = () => {
    if ('sombre'.localeCompare(this.theme) == 0) {
      document.body.setAttribute('color-theme', 'dark');
    } else document.body.setAttribute('color-theme', 'light');
    localStorage.setItem('actuelTheme', JSON.stringify(this.theme));
  };
}
