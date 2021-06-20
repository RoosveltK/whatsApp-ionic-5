import { ModalController } from '@ionic/angular';
import { InfoDiscussionService } from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { ModalStatutComponent } from '../components/modal/modal-statut/modal-statut.component';

@Component({
  selector: 'app-status',
  templateUrl: 'status.page.html',
  styleUrls: ['status.page.scss'],
})
export class StatusPage implements OnInit {
  constructor(
    public serviceContact: ContactsService,
    public serviceInfodiscussion: InfoDiscussionService,
    public modalController: ModalController
  ) {}
  public user;
  public allStatuts;
  public myStatut;
  public anotherStatut;
  
  ngOnInit() {
    this.user = this.serviceInfodiscussion.getActifUser();
    this.serviceContact
      .getStatusCollection()
      .snapshotChanges()
      .subscribe((res) => {
        this.allStatuts = [];
        res.map((element) => {
          this.allStatuts.push(element.payload.doc.data());
        });
        this.allStatuts.forEach((element) => {
          if (element.userId.localeCompare(this.user.id) == 0)
            this.myStatut.push(element);
          else this.anotherStatut.push(element);
        });
      });
  }

  async statutModal() {
    const modal = await this.modalController.create({
      component: ModalStatutComponent,
      componentProps: {
        userInfo: this.user,
      },
    });
    return await modal.present();
  }
}
