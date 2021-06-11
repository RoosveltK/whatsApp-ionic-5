import { PopoverController, ModalController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalSendComponent } from '../../modal/modal-send/modal-send.component';

@Component({
  selector: 'app-popover-conversation',
  templateUrl: './popover-conversation.component.html',
  styleUrls: ['./popover-conversation.component.scss'],
})
export class PopoverConversationComponent implements OnInit {
  @ViewChild('documentInput') documentInputViewChild: ElementRef;
  @ViewChild('galleryInput') galleryInputViewChild: ElementRef;
  @ViewChild('audioInput') audioInputViewChild: ElementRef;

  public documentInputElement: HTMLInputElement;
  public galleryInputElement: HTMLInputElement;
  public audioInputElement: HTMLInputElement;

  public imageOrVideo;
  public audio;
  public documents;

  constructor(
    public popoverController: PopoverController,
    public modalController: ModalController
  ) {}

  ngOnInit() {}
  dismissPopover = () => this.popoverController.dismiss();

  ngAfterViewInit() {
    this.documentInputElement = this.documentInputViewChild.nativeElement;
    this.galleryInputElement = this.galleryInputViewChild.nativeElement;
    this.audioInputElement = this.audioInputViewChild.nativeElement;
  }

  async pickDocuments(event) {
    this.documentInputElement.click();
  }

  async pickGallery(event) {
    this.galleryInputElement.click();
  }

  async pickAudio(event) {
    this.audioInputElement.click();
  }

  loadGallery(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      this.presentModal(file);
    }
  }

  loadAudio(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => (this.imageOrVideo = reader.result as string);
    }
  }

  loadDocument(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => (this.imageOrVideo = reader.result as string);
    }
  }

  async presentModal(fic) {
    this.dismissPopover();
    const modal = await this.modalController.create({
      component: ModalSendComponent,
      componentProps: {
        imageOrVideo: fic,
      },
    });
    return await modal.present();
  }
}
