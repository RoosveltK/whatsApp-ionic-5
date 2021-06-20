import { ContactsService } from './../../../services/contacts.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-statut',
  templateUrl: './modal-statut.component.html',
  styleUrls: ['./modal-statut.component.scss'],
})
export class ModalStatutComponent implements OnInit {
  @Input() userInfo;
  public statutText = '';

  constructor(
    public modalCtrl: ModalController,
    private serviceContact: ContactsService
  ) {}

  ngOnInit() {}

  dismissModal = () => this.modalCtrl.dismiss();
  postStatus() {
    const id = this.userInfo.id + new Date().getTime();

    const data = {
      id: id,
      content: this.statutText,
      date: new Date(),
      iduser: this.userInfo.id,
      nom: this.userInfo.nom,
    };
    console.log(data);
    this.serviceContact
      .postSatus(id, this.statutText, new Date(), this.userInfo)
      .then(() => this.dismissModal())
      .catch((err) => console.log(err));
  }
}
