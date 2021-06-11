import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-send',
  templateUrl: './modal-send.component.html',
  styleUrls: ['./modal-send.component.scss'],
})
export class ModalSendComponent implements OnInit {
  constructor(public modalControler: ModalController) {}
  @Input() imageOrVideo: string;
  @Input() photo: string;
  public image;
  public textMessage;

  ngOnInit() {
    this.readFile(this.imageOrVideo);
  }

  dismiss = () => this.modalControler.dismiss();
  
  readFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => (this.image = reader.result as string);
  }
}
