import { InfoDiscussionService } from './../../../services/info-discussion.service';
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
  private user;
  constructor(
    public popoverController: PopoverController,
    public serviceAuth: FirebaseService,
    private router: Router,
    private serviceFirebase: FirebaseService,
    private serviceDiscussion: InfoDiscussionService
  ) {}

  ngOnInit() {
    this.user = this.serviceDiscussion.getActifUser();
  }

  dismissPopover = () => this.popoverController.dismiss();
  deconnexion = () => {
    this.serviceAuth.signOutUser().then(() => {
      this.router.navigate(['/signin']);
      this.serviceFirebase.setUserOflline(this.user);
      localStorage.clear();
      this.dismissPopover();
    });
  };

  openParametre = () => {
    this.router.navigate(['/parametre']);
    this.dismissPopover();
  };
}
