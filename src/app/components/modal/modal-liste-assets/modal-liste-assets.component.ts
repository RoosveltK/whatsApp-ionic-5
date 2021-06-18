import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-liste-assets',
  templateUrl: './modal-liste-assets.component.html',
  styleUrls: ['./modal-liste-assets.component.scss'],
})
export class ModalListeAssetsComponent implements OnInit {
  @Input() groupData;
  public assets = [];
  constructor(private modalControler: ModalController) {}

  ngOnInit() {
    this.groupData.messages.forEach((element) => {
      if (element.assets !== '')
        this.assets.push({
          date: new Date(element.date.seconds * 1000),
          photo: element.assets,
        });
      console.log(this.assets);
    });
  }
  dismiss() {
    this.modalControler.dismiss();
  }
}
