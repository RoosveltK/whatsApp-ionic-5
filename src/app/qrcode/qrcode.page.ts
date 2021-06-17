import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
  constructor(private router: Router) {}
  @ViewChild('slider', { read: undefined, static: false }) slider: IonSlides;
  @ViewChild('segment', { read: undefined, static: false }) segment: IonSegment;
  slideOpts = {
    initialSlide: 0,
    speed: 100,
  };

  ngOnInit() {}

  async segmentChanged(event: any) {
    const slideId = +(event.detail.value as string).replace('ion-sb-', '');
    await this.slider.slideTo(slideId, 100);
  }

  async slideChanged() {
    this.segment.value =
      'ion-sb-' + (await this.slider.getActiveIndex()).toString();
  }

  backSettings() {
    this.router.navigate(['/parametre']);
  }
}
