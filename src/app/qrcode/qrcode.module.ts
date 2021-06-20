import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodePageRoutingModule } from './qrcode-routing.module';

import { QrcodePage } from './qrcode.page';
import { ScanQRcodeComponent } from '../scan-qrcode/scan-qrcode.component';
import { ReadQrcodeComponent } from '../read-qrcode/read-qrcode.component';
import { QRCodeModule } from 'angularx-qrcode';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrcodePageRoutingModule,
    QRCodeModule,
    TranslateModule,
  ],
  declarations: [QrcodePage, ScanQRcodeComponent, ReadQrcodeComponent],
})
export class QrcodePageModule {}
