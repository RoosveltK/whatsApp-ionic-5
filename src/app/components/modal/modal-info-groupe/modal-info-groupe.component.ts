import { NotificationService } from './../../../services/notification.service';
import { ModalController } from '@ionic/angular';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { InfoDiscussionService } from 'src/app/services/info-discussion.service';

@Component({
  selector: 'app-modal-info-groupe',
  templateUrl: './modal-info-groupe.component.html',
  styleUrls: ['./modal-info-groupe.component.scss'],
})
export class ModalInfoGroupeComponent implements OnInit {
  @ViewChild('userInput') userInputViewChild: ElementRef;
  public userInputElement: HTMLInputElement;

  public dataImage;
  public image;
  public valTcheck;
  public name;
  public isInput = false;
  public infoUser;
  public isAdmin = false;
  @Input() groupData;
  constructor(
    public firebaseService: FirebaseService,
    private serviceTchat: InfoDiscussionService,
    private modalControler: ModalController,
    private serviceNotification: NotificationService
  ) {}

  ngOnInit() {
    this.name = this.groupData.nom[0];
    this.image = this.groupData.photo[0];
    this.valTcheck = !this.groupData.seeForAll;
    this.infoUser = this.serviceTchat.getActifUser();
  }

  ngAfterViewInit() {
    this.userInputElement = this.userInputViewChild.nativeElement;
  }

  findStatutOfUserInGroup = () => {
    this.groupData.grade.forEach((element) => {
      if (
        this.infoUser.id.localeCompare(element.id) == 0 &&
        element.role == 'admin'
      )
        this.isAdmin = true;
    });
  };

  async loadImageActionSheet1(event) {
    this.userInputElement.click();
  }
  dismiss() {
    this.modalControler.dismiss(this.groupData);
  }

  loadImageFromDevice1(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => (this.image = reader.result as string);
    }
    this.dataImage = this.firebaseService.getAndVerifyFile(e.target.files);
    if (this.dataImage != 0) {
      const pathFile = `groupImage/uid${this.groupData.id}_${this.dataImage.name}`;
      this.firebaseService.uploadImage(this.dataImage, pathFile).then(() => {
        const pathRefFile = this.firebaseService.createRefForImage(pathFile);
        pathRefFile.getDownloadURL().subscribe((res) => {
          this.serviceTchat
            .getAllTchats()
            .doc(this.groupData.id)
            .update({ photo: [res] });
        });
      });
    }
  }

  changeParams() {
    const val = !this.valTcheck;
    this.serviceTchat
      .getAllTchats()
      .doc(this.groupData.id)
      .update({ seeForAll: val });
  }
  addAdmin = (id: string) => {
    const newGrade = this.groupData.grade;
    newGrade.forEach((element) => {
      if (id.localeCompare(element.id) == 0 && element.role == 'user')
        element.role = 'admin';
      else if (id.localeCompare(element.id) == 0 && element.role == 'admin')
        element.role = 'user';
    });

    this.serviceTchat
      .getAllTchats()
      .doc(this.groupData.id)
      .update({ grade: newGrade });
  };

  promoteMember(user) {
    this.serviceNotification.confirmationAlert(
      `Voulez vous changer le statut de ${user.nom} ?`,
      () => this.addAdmin(user.id),
      () => console.log(`ouf`),
      `oui`,
      `non`
    );
  }

  edit = () => {
    this.isInput = !this.isInput;
    this.name = this.groupData.nom[0];
  };
  changeName() {
    this.serviceTchat
      .getAllTchats()
      .doc(this.groupData.id)
      .update({ nom: [this.name] });
    this.isInput = false;
  }
}
