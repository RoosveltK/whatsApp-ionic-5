import { NotificationService } from './../../../services/notification.service';
import { InfoDiscussionService } from './../../../services/info-discussion.service';
import { ModalInfoGroupeComponent } from './../../modal/modal-info-groupe/modal-info-groupe.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover-groupe',
  templateUrl: './popover-groupe.component.html',
  styleUrls: ['./popover-groupe.component.scss'],
})
export class PopoverGroupeComponent implements OnInit {
  public userInfo;
  constructor(
    private router: Router,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private serviceTchat: InfoDiscussionService,
    private serviceNotication: NotificationService
  ) {}

  @Input() groupData;

  ngOnInit() {
    this.userInfo = this.serviceTchat.getActifUser();
  }

  dismissPopover = () => this.popoverController.dismiss();

  async presentModal(fic) {
    this.dismissPopover();
    const modal = await this.modalController.create({
      component: ModalInfoGroupeComponent,
      componentProps: {
        groupData: this.groupData,
      },
    });
    return await modal.present();
  }
  quitGroupe = () => {
    this.serviceNotication.loadingController(1000000);
    const tabGrade = [];
    const tabUsers = [];

    this.groupData.grade.forEach((element) => {
      if (this.userInfo.id.localeCompare(element.id) != 0)
        tabGrade.push(element);
    });
    this.groupData.users.forEach((element) => {
      if (this.userInfo.id.localeCompare(element) != 0) tabUsers.push(element);
    });

    this.serviceTchat
      .getAllTchats()
      .doc(this.groupData.id)
      .update({ grade: tabGrade, users: tabUsers })
      .then(() => {
        this.serviceNotication.closeLoader();
        this.dismissPopover();
        this.router.navigate(['/tabs/tchat']);
      });
  };
}
