import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.page.html',
  styleUrls: ['./parametre.page.scss'],
})
export class ParametrePage implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
  backHome = () => {
    const link = ['tabs/tchat'];
    this.router.navigate(link);
  };
}
