import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
})
export class DiscussionComponent implements OnInit {
  @Input() nom: string;
  @Input() heure: string;
  @Input() message: string;
  @Input() image: string;
  @Input() userId: string;
  @Input() messageUiSend: string;
  @Input() messageStatut;
  @Input() assets: string;
  @Input() messageNane: string = '';
  @Input() tabMessage = [];
  public nbreMessages = 0;
  public newMsg = '';
  statut;

  public showPositionMessage = true;
  constructor() {}

  ngOnInit() {
    if (this.messageNane != '') this.newMsg = this.messageNane + ':';
    if (this.messageStatut != undefined) this.statut = this.messageStatut;
    console.log(this.message);
    console.log(this.messageStatut);

    this.tabMessage.forEach((element) => {
      if (
        element.read == false &&
        element.uidSend.localeCompare(this.userId) != 0
      )
        this.nbreMessages++;
    });
  }
}
