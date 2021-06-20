import { NotificationService } from './../services/notification.service';
import { InfoDiscussionService } from './../services/info-discussion.service';
import { Component, OnInit } from '@angular/core';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-read-qrcode',
  templateUrl: './read-qrcode.component.html',
  styleUrls: ['./read-qrcode.component.scss'],
})
export class ReadQrcodeComponent implements OnInit {
  public myInfo;
  showCamera = true;
  public textScanned;

  constructor(
    private serviceInfoDiscussion: InfoDiscussionService,
    // private barcodeScanner: BarcodeScanner,
    private serviceNotification: NotificationService
  ) {}

  ngOnInit() {
    this.myInfo = this.serviceInfoDiscussion.getActifUser();
  }

  // scanQRcode() {
  //   this.barcodeScanner
  //     .scan()
  //     .then((barcodeData) => {
  //       console.log(barcodeData)
  //     })
  //     .catch((err) => {
  //       // error
  //     });
  // }
}
