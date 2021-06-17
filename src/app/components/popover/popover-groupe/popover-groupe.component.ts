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
  constructor(
    private router: Router,
    private modalController: ModalController,
    private popoverController: PopoverController
  ) {}

  @Input() groupData;

  ngOnInit() {}

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
}
