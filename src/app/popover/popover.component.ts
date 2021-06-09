import { Router } from '@angular/router';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  constructor(
    public popoverController: PopoverController,
    public serviceAuth: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {}

  dismissPopover = () => this.popoverController.dismiss();
  deconnexion = () => {
    this.serviceAuth.signOutUser().then(() => {
      this.router.navigate(['/signin']);
      this.dismissPopover();
    });
  };

  openParametre = () => {
    this.router.navigate(['/parametre']);
    this.dismissPopover();
  };
}
