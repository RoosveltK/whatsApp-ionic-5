import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

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
      localStorage.clear();
      this.dismissPopover();
    });
  };

  openParametre = () => {
    this.router.navigate(['/parametre']);
    this.dismissPopover();
  };
}
