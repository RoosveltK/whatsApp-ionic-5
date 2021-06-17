import { NotificationService } from './../services/notification.service';
import { InfoDiscussionService } from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-read-qrcode',
  templateUrl: './read-qrcode.component.html',
  styleUrls: ['./read-qrcode.component.scss'],
})
export class ReadQrcodeComponent implements OnInit {
  public myInfo;
  showCamera = true;
  public textScanned = undefined;

  constructor(
    private serviceInfoDiscussion: InfoDiscussionService,
    private qrScanner: QRScanner,
    private serviceNotification: NotificationService
  ) {}

  ngOnInit() {
    this.myInfo = this.serviceInfoDiscussion.getActifUser();
    this.scanCode();
  }
  scanCode() {
    console.log("camera")
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // start scanning
          console.log('Scan en cours...' + JSON.stringify(status));
          const scanSub = this.qrScanner.scan().subscribe((text: any) => {
            this.textScanned = text.result;
            this.qrScanner.hide();
            scanSub.unsubscribe();
            this.showCamera = false;
            this.serviceNotification.loadingController(5000);
          });
        } else if (status.denied) {
          // camera permission was permanently denied
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  closeCamera() {
    this.showCamera = false;
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }
}
