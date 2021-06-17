import { Component, OnInit } from '@angular/core';
import { InfoDiscussionService } from '../services/info-discussion.service';

@Component({
  selector: 'app-scan-qrcode',
  templateUrl: './scan-qrcode.component.html',
  styleUrls: ['./scan-qrcode.component.scss'],
})
export class ScanQRcodeComponent implements OnInit {
  public showCamera = false;
  public textScan;
  public myInfo;
  public qrData;
  constructor(private serviceInfoDiscussion: InfoDiscussionService) {}

  ngOnInit() {
    this.myInfo = this.serviceInfoDiscussion.getActifUser();
    this.qrData = JSON.stringify(this.myInfo);
  }
}
