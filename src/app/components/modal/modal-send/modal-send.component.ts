import { NotificationService } from './../../../services/notification.service';
import { InfoDiscussionService } from './../../../services/info-discussion.service';
import { FirebaseService } from './../../../services/firebase.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/services/info-discussion.service';

@Component({
  selector: 'app-modal-send',
  templateUrl: './modal-send.component.html',
  styleUrls: ['./modal-send.component.scss'],
})
export class ModalSendComponent implements OnInit {
  constructor(
    public modalControler: ModalController,
    public serviceFirebase: FirebaseService,
    public serviceInfoDiscussion: InfoDiscussionService,
    private serviceNotification: NotificationService
  ) {}
  @Input() imageOrVideo;
  @Input() photo: string;
  @Input() allMessages;
  @Input() userId;
  public image;
  public text = '';
  public idTchat;

  ngOnInit() {
    this.readFile(this.imageOrVideo);
  }

  dismiss = () => this.modalControler.dismiss();

  readFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => (this.image = reader.result as string);
  }

  sendAssets() {
    this.serviceNotification.loadingController(10000);
    const idPhoto = Math.random().toString(36).substr(2, 9);
    const path = `assetsTchats/${this.idTchat}${idPhoto}${this.imageOrVideo}`;

    this.serviceFirebase.uploadImage(this.imageOrVideo, path).then(() => {
      this.serviceFirebase
        .createRefForImage(path)
        .getDownloadURL()
        .subscribe((urlDownload) => {
          const infoMessage: Message = {
            uidSend: this.userId,
            messagetext: this.text,
            date: new Date(),
            heure: `${new Date().getHours()}:${new Date().getMinutes()}`,
            assets: urlDownload,
            read: false,
          };
          this.allMessages.push(infoMessage);
          this.serviceInfoDiscussion
            .getAllTchats()
            .doc(this.idTchat)
            .update({ messages: this.allMessages })
            .then(() => {
              this.text = '';
              this.serviceNotification.closeLoader();
              this.dismiss();
            });
        });
    });
  }
}
